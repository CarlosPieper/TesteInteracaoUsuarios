using System.Collections.Generic;
using EmagrecerSocial.API.Interfaces;
using EmagrecerSocial.API.Models;
using EmagrecerSocial.API.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
namespace EmagrecerSocial.API.Controllers
{
    [Route("[controller]/[action]")]
    public class ForumCommentsController : Controller
    {
        private IForumCommentRepository repository;
        public ForumCommentsController(IForumCommentRepository _repository)
        {
            this.repository = _repository;
        }

        [ActionName("Include")]
        [HttpPost]
        public ActionResult Include(ForumComment forumComment)
        {
            forumComment.Author = (int)HttpContext.Session.GetInt32("Id");
            try
            {
                repository.Include(forumComment);
                return Ok(new { success = true });
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }

        [ActionName("Modify")]
        [HttpPost]
        public ActionResult Modify(ForumComment forumComment)
        {
            try
            {
                repository.Include(forumComment);
                return Ok(new { success = true });
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }

        [ActionName("ListForumComments")]
        [HttpGet]
        public ActionResult ListForumComments(int forum)
        {
            try
            {
                List<ForumComment> forumComments = repository.ListForumComments(forum);
                return Ok(forumComments);
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }
    }
}