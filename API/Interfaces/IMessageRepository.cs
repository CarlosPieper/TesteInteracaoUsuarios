using System.Collections.Generic;
using EmagrecerSocial.API.Models;
namespace EmagrecerSocial.API.Interfaces
{
    public interface IMessageRepository
    {
        void Include(Message message);
        void Delete(int id);
        List<Message> ListMessages();
    }
}