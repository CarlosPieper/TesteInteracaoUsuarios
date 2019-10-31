using System.Collections.Generic;
using EmagrecerSocial.API.Interfaces;
using EmagrecerSocial.API.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
namespace EmagrecerSocial.API.Controllers
{
    [Route("[controller]/[action]")]
    public class MessageController : Controller
    {
        private IMessageRepository repository;
        public MessageController(IMessageRepository _repository)
        {
            this.repository = _repository;
        }
    }
}