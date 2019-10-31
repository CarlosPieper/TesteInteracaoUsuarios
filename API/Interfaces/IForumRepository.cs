using System.Collections.Generic;
using EmagrecerSocial.API.Models;
namespace EmagrecerSocial.API.Interfaces
{
    public interface IForumRepository
    {
        void Include(Forum forum);
        void Modify(Forum forum);
        Forum SearchForId(int id);
        List<Forum> ListForums(int user);
        void Delete(int id);
        List<Forum> GetUserForums(int user);
    }
}