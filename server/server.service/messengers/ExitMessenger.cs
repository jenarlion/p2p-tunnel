﻿using common.server;
using server.messengers.register;
using System.Threading.Tasks;

namespace server.service.messengers
{
    public class ExitMessenger : IMessenger
    {
        private readonly IClientRegisterCaching clientRegisterCache;
        public ExitMessenger(IClientRegisterCaching clientRegisterCache)
        {
            this.clientRegisterCache = clientRegisterCache;
        }

        public async Task<bool> Execute(IConnection connection)
        {
            return await clientRegisterCache.Remove(connection.ConnectId).ConfigureAwait(false);
        }
    }
}
