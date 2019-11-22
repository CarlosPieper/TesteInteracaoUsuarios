using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using EmagrecerSocial.API.Interfaces;
using EmagrecerSocial.API.Models;
using EmagrecerSocial.API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MySql.Data.MySqlClient;
using System.IO;
using System.Net.Http.Headers;

namespace EmagrecerSocial.API.Controllers
{
    [Route("[controller]/[action]")]
    public class UserController : Controller
    {
        private IUserRepository repository;
        private readonly ApplicationSettings appSettings;
        IUtilitiesRepository utilities;
        public UserController(IUserRepository _repository, IOptions<ApplicationSettings> _appSettings, IUtilitiesRepository _utilities)
        {
            this.repository = _repository;
            this.appSettings = _appSettings.Value;
            this.utilities = _utilities;
        }

        [ActionName("Register")]
        [HttpPost]
        public ActionResult Register(User user)
        {
            user.RegistrationDate = DateTime.Now;
            user.Password = Cryptography.EncryptPassword(user.Password);
            try
            {
                if (repository.VerifyEmail(user.Email))
                {
                    repository.Include(user);
                }
                return Ok(new { success = true });

            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }

        [ActionName("Login")]
        [HttpGet]
        public ActionResult Login(string email = "", string password = "")
        {
            var token = "";
            password = Cryptography.EncryptPassword(password);
            try
            {
                User user = repository.Login(email, password);
                if (user.Id != 0)
                {
                    var tokenDescriptor = new SecurityTokenDescriptor()
                    {
                        Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                        {
                        new Claim("UserId",user.Id.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddDays(1),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings.JWTSecret)), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    token = tokenHandler.WriteToken(securityToken);
                    user.Password = "";
                    UtilitiesRepository.coverPic = user.CoverPic;
                    UtilitiesRepository.profilePic = user.ProfilePic;
                    return Ok(new { token = token, success = true, user = user });
                }
                else
                {
                    return Ok(new { token, success = true });
                }
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }

        [ActionName("Edit")]
        [HttpPost]
        public ActionResult Edit(User user)
        {
            user.Password = Cryptography.EncryptPassword(user.Password);
            user.Cpf = " ";
            if (user.ProfilePic == "" || user.ProfilePic == null)
                user.ProfilePic = UtilitiesRepository.profilePic;
            if (user.CoverPic == "" || user.CoverPic == null)
                user.CoverPic = UtilitiesRepository.coverPic;
            try
            {
                repository.Edit(user);
                return Ok(new { success = true });
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
                User user = repository.SearchById(id);
                return Ok(new { user = user, canEdit = false });
            }
            catch (MySqlException ex)
            {
                throw ex;
            }
        }

        [ActionName("SearchByName")]
        [HttpGet]
        public ActionResult SearchByName(string name)
        {
            try
            {
                List<User> users = repository.SearchByName(name);
                return Ok(new { users = users });
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
        [HttpGet]
        [ActionName("GetUserData")]
        public ActionResult GetUserData(int idLogged, int id = 0)
        {
            User user = new User();
            if (id == idLogged || id == 0)
            {
                user = repository.SearchById(idLogged);
                user.Password = "";
                return Ok(new { user = user, canEdit = true });
            }
            else
            {
                return Ok(new { user = repository.SearchById(id) });
            }
        }

        [HttpGet]
        [ActionName("RecoverPassword")]
        public ActionResult RecoverPassword(string email)
        {
            string newPassword = CreatePassword();
            MailController.SendEmailRecovery(email, newPassword);
            string encryptedPassword = Cryptography.EncryptPassword(newPassword);
            repository.ChangePassword(encryptedPassword, email);
            return Ok();
        }

        public string CreatePassword()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();
            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }
            string password = new String(stringChars);
            return password;
        }

        [HttpPost]
        [ActionName("SaveProfilePic")]
        public ActionResult SaveProfilePic(string name)
        {
            try
            {
                var file = Request.Form.Files[0];
                string path = @"C:\\EmagrecerSocial\\emagrecer\\public\\images\\profile\\";
                string fileName = utilities.RemoveAccents(name.Replace(" ", "") + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"').Replace(" ", ""));
                UtilitiesRepository.profilePic = "/images/profile" + "/" + fileName;
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
            return Ok();
        }

        [HttpPost]
        [ActionName("SaveCoverPic")]
        public ActionResult SaveCoverPic(string name)
        {
            try
            {
                var file = Request.Form.Files[0];
                string path = @"C:\\EmagrecerSocial\\emagrecer\\public\\images\\cover\\";
                string fileName = utilities.RemoveAccents(name.Replace(" ", "") + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"').Replace(" ", ""));
                UtilitiesRepository.coverPic = "/images/cover" + "/" + fileName;
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
            return Ok();
        }
    }
}