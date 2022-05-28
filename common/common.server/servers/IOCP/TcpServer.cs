﻿using common.libs;
using common.libs.extends;
using System;
using System.Buffers;
using System.Net;
using System.Net.Sockets;
using System.Threading;

namespace common.server.servers.iocp
{
    public class TcpServer : ITcpServer
    {
        private int bufferSize = 8 * 1024;
        private Socket socket;
        private CancellationTokenSource cancellationTokenSource;

        public SimpleSubPushHandler<IConnection> OnPacket { get; } = new SimpleSubPushHandler<IConnection>();

        public TcpServer() { }

        public void SetBufferSize(int bufferSize = 8 * 1024)
        {
            this.bufferSize = bufferSize;
        }
        public void Start(int port, IPAddress ip)
        {
            if (socket == null)
            {
                cancellationTokenSource = new CancellationTokenSource();
                socket = BindAccept(port, ip ?? IPAddress.Any);
            }
        }

        public Socket BindAccept(int port, IPAddress ip)
        {
            IPEndPoint localEndPoint = new IPEndPoint(ip, port);

            var socket = new Socket(localEndPoint.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
            socket.SetSocketOption(SocketOptionLevel.Socket, SocketOptionName.ReuseAddress, true);
            socket.Bind(localEndPoint);
            socket.Listen(int.MaxValue);

            SocketAsyncEventArgs acceptEventArg = new SocketAsyncEventArgs
            {
                UserToken = new AsyncUserToken
                {
                    Socket = socket,
                },
                SocketFlags = SocketFlags.None,
            };
            acceptEventArg.Completed += IO_Completed;
            StartAccept(acceptEventArg);

            return socket;

        }
        private void StartAccept(SocketAsyncEventArgs acceptEventArg)
        {
            acceptEventArg.AcceptSocket = null;
            AsyncUserToken token = ((AsyncUserToken)acceptEventArg.UserToken);
            try
            {
                if (!token.Socket.AcceptAsync(acceptEventArg))
                {
                    ProcessAccept(acceptEventArg);
                }
            }
            catch (Exception)
            {
            }
        }
        private void IO_Completed(object sender, SocketAsyncEventArgs e)
        {
            switch (e.LastOperation)
            {
                case SocketAsyncOperation.Accept:
                    ProcessAccept(e);
                    break;
                case SocketAsyncOperation.Receive:
                    ProcessReceive(e);
                    break;
                case SocketAsyncOperation.Send:
                    ProcessSend(e);
                    break;
                default:
                    Logger.Instance.DebugError(e.LastOperation.ToString());
                    break;
            }
        }
        private void ProcessAccept(SocketAsyncEventArgs e)
        {
            BindReceive(e.AcceptSocket, null, bufferSize);
            StartAccept(e);
        }

        public IConnection BindReceive(Socket socket, Action<SocketError> errorCallback = null, int bufferSize = 8 * 1024)
        {
            this.bufferSize = bufferSize;
            AsyncUserToken userToken = new AsyncUserToken
            {
                Socket = socket,
                ErrorCallback = errorCallback,
                Connection = CreateConnection(socket),
            };
            SocketAsyncEventArgs readEventArgs = new SocketAsyncEventArgs
            {
                UserToken = userToken,
                SocketFlags = SocketFlags.None,
            };
            userToken.PoolBuffer = ArrayPool<byte>.Shared.Rent(bufferSize);
            readEventArgs.SetBuffer(userToken.PoolBuffer, 0, bufferSize);
            readEventArgs.Completed += IO_Completed;
            if (!socket.ReceiveAsync(readEventArgs))
            {
                ProcessReceive(readEventArgs);
            }
            return userToken.Connection;
        }
        private void ProcessReceive(SocketAsyncEventArgs e)
        {
            AsyncUserToken token = (AsyncUserToken)e.UserToken;
            try
            {
                if (e.BytesTransferred > 0 && e.SocketError == SocketError.Success)
                {
                    int offset = e.Offset;
                    int length = e.BytesTransferred;
                    token.DataBuffer.AddRange(e.Buffer, offset, length);
                    ReadPacket(token);

                    if (token.Socket.Available > 0)
                    {
                        var arr = ArrayPool<byte>.Shared.Rent(bufferSize);
                        while (token.Socket.Available > 0)
                        {
                            length = token.Socket.Receive(arr);
                            if (length > 0)
                            {
                                token.DataBuffer.AddRange(arr, 0, length);
                                ReadPacket(token);
                            }
                            else
                            {
                                token.ErrorCallback?.Invoke(SocketError.SocketError);
                                CloseClientSocket(e);
                                return;
                            }
                        }
                        ArrayPool<byte>.Shared.Return(arr);
                    }

                    if (!token.Socket.Connected)
                    {
                        token.ErrorCallback?.Invoke(SocketError.SocketError);
                        CloseClientSocket(e);
                        return;
                    }
                    if (!token.Socket.ReceiveAsync(e))
                    {
                        ProcessReceive(e);
                    }
                }
                else
                {
                    token.ErrorCallback?.Invoke(e.SocketError);
                    CloseClientSocket(e);
                }
            }
            catch (Exception ex)
            {
                token.ErrorCallback?.Invoke(SocketError.SocketError);
                token.Clear();
                Logger.Instance.DebugError(ex);
            }
        }
        private void ReadPacket(AsyncUserToken token)
        {
            do
            {
                int packageLen = token.DataBuffer.Data.Span.ToInt32();
                if (packageLen > token.DataBuffer.Size - 4)
                {
                    break;
                }
                token.Connection.ReceiveData = token.DataBuffer.Data.Slice(4, packageLen);

                OnPacket.Push(token.Connection);

                token.DataBuffer.RemoveRange(0, packageLen + 4);
            } while (token.DataBuffer.Size > 4);
        }

        private void ProcessSend(SocketAsyncEventArgs e)
        {
            if (e.SocketError == SocketError.Success)
            {
                AsyncUserToken token = (AsyncUserToken)e.UserToken;
                if (!token.Socket.ReceiveAsync(e))
                {
                    ProcessReceive(e);
                }
            }
            else
            {
                CloseClientSocket(e);
            }
        }
        private void CloseClientSocket(SocketAsyncEventArgs e)
        {
            AsyncUserToken token = e.UserToken as AsyncUserToken;
            token.Clear();
            e.Dispose();
        }

        public IConnection CreateConnection(Socket socket)
        {
            return new TcpConnection(socket);
        }

        public void Stop()
        {
            cancellationTokenSource?.Cancel();
            socket?.SafeClose();
        }
    }

    public class AsyncUserToken
    {
        public short SyncCount { get; set; } = 0;
        public IConnection Connection { get; set; }
        public Socket Socket { get; set; }
        public Action<SocketError> ErrorCallback { get; set; }
        public ReceiveDataBuffer DataBuffer { get; set; } = new ReceiveDataBuffer();

        public byte[] PoolBuffer { get; set; }

        public void Clear()
        {
            if (PoolBuffer != null && PoolBuffer.Length > 0)
            {
                ArrayPool<byte>.Shared.Return(PoolBuffer);
            }

            ErrorCallback = null;
            Socket?.SafeClose();
            Socket = null;

            DataBuffer.Clear(true);
        }
    }
}
