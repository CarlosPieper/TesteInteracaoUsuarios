using System.Collections.Generic;
using EmagrecerSocial.API.Models;
namespace EmagrecerSocial.API.Interfaces
{
    public interface IForumCommentRepository
    {
        void Include(ForumComment forumComment);
        List<ForumComment> ListForumComments(int forum);
    }
}