using System.Collections.Generic;
using EmagrecerSocial.API.Models;

namespace EmagrecerSocial.API.Interfaces
{
    public interface IFriendsRepository
    {
        void Accept(int idLogged, int id);
        void Delete(int idLogged, int id);
        List<User> ListFriends(int idLogged);
        bool VerifyFriendship(int idLogged, int id);
    }
}