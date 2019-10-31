using System;
namespace EmagrecerSocial.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime RegistrationDate { get; set; }
        public DateTime BirthDate { get; set; }
        public string Password { get; set; }
        public string Genre { get; set; }
        public string Email { get; set; }
        public string Cpf { get; set; }
        public string City { get; set; }
        public string Description { get; set; }
        public string ProfilePic { get; set; }
        public string CoverPic { get; set; }
        
    }
}