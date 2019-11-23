using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using EmagrecerSocial.API.Interfaces;
using EmagrecerSocial.API.Models;
using EmagrecerSocial.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace EmagrecerSocial.API.Controllers
{
    [Route("[controller]/[action]")]
    public class FriendsController : Controller
    {
        private IFriendsRepository repository;
        public FriendsController(IFriendsRepository _repository)
        {
            this.repository = _repository;
        }

        [ActionName("RemoveFriend")]
        [HttpPost]
        public ActionResult RemoveFriend(int idLogged, int id)
        {
            try
            {
                repository.Delete(idLogged, id);
                return Ok(new { success = true });
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }

        [ActionName("ListFriends")]
        [HttpGet]
        public ActionResult ListFriends(int id)
        {
            try
            {
                List<User> friends = repository.ListFriends(id);
                return Ok(new { friends = friends });
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }
    }
}