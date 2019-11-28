using EmagrecerSocial.API.Models;
using Microsoft.AspNetCore.SignalR;

namespace EmagrecerSocial.API.Hubs
{
    public class ChatHub : Hub
    {
        public void SendToAll(string name, string message, int id)
        {
            Clients.All.SendAsync("sendToAll", name, message, id);
        }
    }
}