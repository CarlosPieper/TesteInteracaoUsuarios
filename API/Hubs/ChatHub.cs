using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace EmagrecerSocial.API.Hubs
{
    public class ChatHub : Hub
    {
        public async Task sendToAll(string user, string message)
        {
            await Clients.All.SendAsync("sendToAll", user, message);
        }
    }
}