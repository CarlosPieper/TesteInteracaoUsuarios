using System.Collections.Generic;
using EmagrecerSocial.API.Interfaces;
using EmagrecerSocial.API.Models;
using MySql.Data.MySqlClient;

namespace EmagrecerSocial.API.Repositories
{
    public class ForumCommentRepository : IForumCommentRepository
    {
        private MySqlConnection connection;
        public ForumCommentRepository(MySqlConnection conn)
        {
            this.connection = conn;
        }

        public void Include(ForumComment forumComment)
        {
            connection.Open();
            string sql = "INSERT INTO FORUM_COMMENTS (FORUM, COMMENT_TEXT, AUTHOR) VALUES (?, ?, ?)";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@FORUM", MySqlDbType.Int32).Value = forumComment.Forum;
                command.Parameters.Add("@COMMENT_TEXT", MySqlDbType.String).Value = forumComment.Text;
                command.Parameters.Add("@AUTHOR", MySqlDbType.Int32).Value = forumComment.Author;
                command.ExecuteNonQuery();
            }
            connection.Close();
        }

        public List<ForumComment> ListForumComments(int forum)
        {
            connection.Open();
            List<ForumComment> comments = new List<ForumComment>();
            string sql = @"SELECT F.*, U.NAME FROM FORUM_COMMENTS F INNER JOIN USERS U ON (F.AUTHOR = U.ID) 
            WHERE FORUM = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@ID", MySqlDbType.Int32).Value = forum;
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        ForumComment forumComments = new ForumComment();
                        forumComments.Id = reader.GetInt32("ID");
                        forumComments.Forum = reader.GetInt32("FORUM");
                        forumComments.Text = reader.GetString("COMMENT_TEXT");
                        forumComments.Author = reader.GetInt32("AUTHOR");
                        forumComments.AuthorName = reader.GetString("NAME");
                        comments.Add(forumComments);
                    }
                }
            }
            connection.Close();
            return comments;
        }

        public void Modify(ForumComment forumComment)
        {
            connection.Open();
            string sql = "UPDATE FORUM_COMMENTS SET COMMENT_TEXT = ? WHERE ID = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@COMMENT_TEXT", MySqlDbType.String).Value = forumComment.Text;
                command.Parameters.Add("@ID", MySqlDbType.Int32).Value = forumComment.Id;
                command.ExecuteNonQuery();
            }
            connection.Close();
        }
    }
}