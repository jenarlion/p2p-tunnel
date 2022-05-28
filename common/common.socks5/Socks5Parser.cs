﻿using common.libs;
using common.libs.extends;
using System;
using System.Buffers.Binary;
using System.Net;
using System.Text;

namespace common.socks5
{
    /// <summary>
    /// socks5 数据包解析和组装
    /// </summary>
    public class Socks5Parser
    {

        /// <summary>
        /// 获取客户端过来的支持的认证方式列表
        /// </summary>
        /// <param name="span"></param>
        /// <returns></returns>
        public static Socks5EnumAuthType[] GetAuthMethods(ReadOnlySpan<byte> span)
        {
            Socks5EnumAuthType[] res = new Socks5EnumAuthType[span[1]];
            for (int i = 0; i < span.Length; i++)
            {
                res[i] = (Socks5EnumAuthType)span[i];
            }
            return res;
        }

        public static (string username, string password) GetPasswordAuthInfo(Span<byte> span)
        {
            /*
             子版本 username长度 username password长度 password
             0x01   
             */
            string username = span.Slice(2, span[1]).GetString();
            string password = span.Slice(2 + span[1] + 1, span[2 + span[1]]).GetString();
            return (username, password);
        }

        public static IPEndPoint GetRemoteEndPoint(ReadOnlySpan<byte> span)
        {
            //去掉 VERSION COMMAND RSV 
            span = span.Slice(3, span.Length - 3);

            ushort int16Port = BitConverter.ToUInt16(span.Slice(span.Length - 2, 2));
            int port = BitConverter.IsLittleEndian ? BinaryPrimitives.ReverseEndianness(int16Port) : int16Port;

            IPAddress ip = null;
            switch ((Socks5EnumAddressType)span[0])
            {
                case Socks5EnumAddressType.IPV4:
                    ip = new IPAddress(span.Slice(1, 4));
                    break;
                case Socks5EnumAddressType.IPV6:
                    ip = new IPAddress(span.Slice(1, 16));
                    break;
                case Socks5EnumAddressType.Domain:
                    ip = NetworkHelper.GetDomainIp(Encoding.UTF8.GetString(span.Slice(2, span[1])));
                    break;

                default:
                    break;
            }
            return new IPEndPoint(ip, port);
        }

        public static byte[] MakeConnectResponse(IPEndPoint remoteEndPoint, byte responseCommand)
        {
            byte[] ipaddress = remoteEndPoint.Address.GetAddressBytes();
            byte[] port = BitConverter.GetBytes(remoteEndPoint.Port);

            byte[] res = new byte[6 + ipaddress.Length];

            res[0] = 5;
            res[1] = responseCommand;
            res[2] = 0;
            res[3] = (byte)(ipaddress.Length == 4 ? Socks5EnumAddressType.IPV4 : Socks5EnumAddressType.IPV6);

            Array.Copy(ipaddress, 0, res, 4, ipaddress.Length);

            res[res.Length - 2] = port[1];
            res[res.Length - 1] = port[0];

            return res;
        }

    }
}
