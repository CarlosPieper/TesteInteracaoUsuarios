using EmagrecerSocial.API.Controllers;
using Microsoft.AspNetCore.SignalR;
using MySql.Data.MySqlClient;
using System;
using System.Threading.Tasks;

namespace EmagrecerSocial.API.Hubs
{
    public class ChatHub : Hub
    {
        MySqlConnection connection;
        public ChatHub(MySqlConnection conn)
        {
            connection = conn;
        }
        public override async Task OnConnectedAsync()
        {
            connection.Open();
            System.Console.WriteLine("CONECTADO");
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception exception = null)
        {
            connection.Close();
            System.Console.WriteLine("DESCONECTADO");
            await base.OnDisconnectedAsync(exception);
        }
    }
}