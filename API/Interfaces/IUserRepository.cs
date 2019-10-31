using System.Collections.Generic;
using EmagrecerSocial.API.Models;
namespace EmagrecerSocial.API.Interfaces
{
    public interface IUserRepository
    {
        void Include(User user);
        User Login(string email, string password);
        void Edit(User user);
        User SearchById(int id);
        List<User> ListFriends(int id);
        List<User> SearchByName(string name);
        bool VerifyEmail(string email);
        void ChangePassword(string password, string email);


    }
}