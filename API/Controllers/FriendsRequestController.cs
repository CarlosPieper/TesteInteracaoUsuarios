using System.Collections.Generic;
using EmagrecerSocial.API.Interfaces;
using EmagrecerSocial.API.Models;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace EmagrecerSocial.API.Controllers
{
    [Route("[controller]/[action]")]
    public class FriendsRequestController : Controller
    {
        private IFriendsRequestRepository repository;
        IFriendsRepository friendsRepository;
        public FriendsRequestController(IFriendsRequestRepository _repository, IFriendsRepository _friendsRepository)
        {
            this.repository = _repository;
            this.friendsRepository = _friendsRepository;
        }

        [ActionName("AcceptFriendRequest")]
        [HttpPost]
        public ActionResult AcceptFriendRequest(int idLogged, int id)
        {
            try
            {
                friendsRepository.Accept(idLogged, id);
                repository.Delete(idLogged, id);
                return Ok(new { success = true });
            }
            catch (MySqlException ex)
            {
                
                throw ex;
            }
        }

        [ActionName("RemoveFriendRequest")]
        [HttpPost]
        public ActionResult RemoveFriendRequest(int idLogged, int id)
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

        [ActionName("GetFriendRequests")]
        [HttpGet]
        public ActionResult GetFriendRequests(int id)
        {
            try
            {
                List<FriendRequest> requests = repository.ListFriendRequests(id);
                return Ok(new { requests = requests });
            }
            catch (MySqlException ex)
            {
                
                throw ex;
            }
        }

        [ActionName("Invite")]
        [HttpPost]
        public ActionResult Invite(int idLogged, int id)
        {
            try
            {
                repository.InviteFriend(idLogged, id);
                return Ok(new { success = true });
            }
            catch (MySqlException ex)
            {
                
                throw ex;
            }
        }
    }
}