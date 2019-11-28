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
    public class ForumController : Controller
    {
        private IForumRepository repository;
        IUtilitiesRepository utilities;
        public ForumController(IForumRepository _repository, IUtilitiesRepository _utilities)
        {
            this.repository = _repository;
            this.utilities = _utilities;
        }

        [ActionName("Include")]
        [HttpPost]
        public ActionResult Include(Forum forum)
        {
            forum.Picture = UtilitiesRepository.filePath;
            if (forum.Picture == null)
                forum.Picture = " ";
            try
            {
                repository.Include(forum);
                return Ok(new { success = true });
            }
            catch (MySqlException ex)
            {

                throw ex;
            }
        }

        [ActionName("Modify")]
        [HttpPost]
        public ActionResult Modify(Forum forum)
        {
            try
            {
                repository.Modify(forum);
                return Ok(new { success = true });
            }
            catch (MySqlException ex)
            {

                throw ex;
            }
        }

        [ActionName("ListForums")]
        [HttpGet]
        public ActionResult ListForums(int id)
        {
            List<Forum> forums = new List<Forum>();
            try
            {
                if (repository.UserHasFriends(id))
                {
                    forums = repository.ListForums(id);
                }
                else
                {
                    forums = repository.GetUserForums(id);
                }
                return Ok(new { forums = forums });
            }
            catch (MySqlException ex)
            {

                throw ex;
            }
        }

        [ActionName("SearchById")]
        [HttpGet]
        public ActionResult SearchById(int id)
        {
            try
            {
                Forum forum = repository.SearchById(id);
                return Ok(new { forum = forum });
            }
            catch (MySqlException ex)
            {

                throw ex;
            }
        }

        [ActionName("Delete")]
        [HttpPost]
        public ActionResult Delete(int id)
        {
            try
            {
                repository.Delete(id);
                return Ok(new { success = true });
            }
            catch (MySqlException ex)
            {

                throw ex;
            }

        }

        [ActionName("ImagePost")]
        [HttpPost]
        public void ImagePost()
        {
            DateTime now = DateTime.Now;
            try
            {
                var file = Request.Form.Files[0];
                string path = @"C:\\EmagrecerSocial\\emagrecer\\public\\images\\";
                string picName = now.Year + "" + now.Month + "" + now.Day + "" + now.Hour + "" + now.Minute + "" + now.Second + "" + now.Millisecond + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"').Replace(" ", "");
                string fileName = picName;
                UtilitiesRepository.filePath = "/images" + "/" + fileName;
                if (!Directory.Exists(path))
                {
                    Directory.CreateDirectory(path);
                }
                if (file.Length > 0)
                {
                    string fullPath = Path.Combine(path, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        [ActionName("ListUserForums")]
        [HttpGet]
        public ActionResult ListUserForums(int id)
        {
            List<Forum> forums = repository.GetUserForums(id);
            return Ok(new { forums = forums });
        }
    }
}