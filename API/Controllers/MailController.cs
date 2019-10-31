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
using Microsoft.AspNetCore.Http;
using System.Net.Mail;

namespace EmagrecerSocial.API.Controllers
{
    public class MailController : Controller
    {
        public static void SendEmailRecovery(string adress, string newPassword)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add(adress);
            mail.From = new MailAddress("clebanca@gmail.com");
            mail.Subject = "Recuperação de senha do Emagrecer Social";
            string Body = @"Sua senha foi alterada, agora é: " + newPassword + @". <br> 
            Se você quiser, pode ir na sua edição de perfil e alterá-la.";
            mail.Body = Body;
            mail.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.UseDefaultCredentials = false;
            smtp.EnableSsl = true;
            smtp.Credentials = new System.Net.NetworkCredential("clebanca@gmail.com", "banca 123");
            smtp.Send(mail);
        }
    }
}