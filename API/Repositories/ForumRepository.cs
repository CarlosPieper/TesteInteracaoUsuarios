using System.Collections.Generic;
using EmagrecerSocial.API.Interfaces;
using EmagrecerSocial.API.Models;
using MySql.Data.MySqlClient;

namespace EmagrecerSocial.API.Repositories
{
    public class ForumRepository : IForumRepository
    {
        private MySqlConnection connection;
        public ForumRepository(MySqlConnection conn)
        {
            this.connection = conn;
        }

        public void Delete(int id)
        {
            connection.Open();
            string sql = "DELETE FROM FORUMS WHERE ID = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@Id", MySqlDbType.String).Value = id;
                command.ExecuteNonQuery();
            }
            connection.Close();
        }

        public void Include(Forum forum)
        {
            connection.Open();
            string sql = "INSERT INTO FORUMS (TITLE, TEXT, AUTHOR, PICTURE) VALUES (?, ?, ?, ?)";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@TITLE", MySqlDbType.String).Value = forum.Title;
                command.Parameters.Add("@TEXT", MySqlDbType.String).Value = forum.Text;
                command.Parameters.Add("@AUTHOR", MySqlDbType.Int32).Value = forum.Author;
                command.Parameters.Add("@PICTURE", MySqlDbType.String).Value = forum.Picture;
                command.ExecuteNonQuery();
            }
            connection.Close();
        }

        public List<Forum> ListForums(int user)
        {
            connection.Open();
            List<Forum> forums = new List<Forum>();
            string sql = @"SELECT F.*, U.NAME AS AUTHORNAME FROM FORUMS F INNER JOIN USERS U ON (F.AUTHOR = U.ID) 
            INNER JOIN FRIENDS FR ON (F.AUTHOR = FR.FRIEND) WHERE FR.USER = ? OR FR.FRIEND = ? ORDER BY F.ID DESC;";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@USER", MySqlDbType.String).Value = user;
                command.Parameters.Add("@FRIEND", MySqlDbType.String).Value = user;
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Forum forum = new Forum();
                        forum.Id = reader.GetInt32("ID");
                        forum.Author = reader.GetInt32("AUTHOR");
                        forum.Text = reader.GetString("TEXT");
                        forum.Title = reader.GetString("TITLE");
                        forum.AuthorName = reader.GetString("AUTHORNAME");
                        forum.Picture = reader.GetString("PICTURE");
                        forums.Add(forum);
                    }
                }
            }
            connection.Close();
            return forums;
        }


        public void Modify(Forum forum) //ainda não sei se isso vai ser mantido
        {
            connection.Open();
            string sql = "UPDATE FORUMS SET TITLE = ?, TEXT = ?, AUTHOR = ? WHERE ID = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@TITLE", MySqlDbType.String).Value = forum.Title;
                command.Parameters.Add("@TEXT", MySqlDbType.String).Value = forum.Text;
                command.Parameters.Add("@AUTHOR", MySqlDbType.Int32).Value = forum.Author;
                command.Parameters.Add("@ID", MySqlDbType.Int32).Value = forum.Id;
                command.ExecuteNonQuery();
            }
            connection.Close();
        }

        public Forum SearchById(int id)
        {
            connection.Open();
            Forum forum = new Forum();
            string sql = "SELECT F.*, U.NAME FROM FORUMS F INNER JOIN USERS U ON (F.AUTHOR = U.ID) WHERE F.ID = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"ID", MySqlDbType.Int32).Value = id;
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        forum.Id = reader.GetInt32("ID");
                        forum.Author = reader.GetInt32("AUTHOR");
                        forum.Text = reader.GetString("TEXT");
                        forum.Title = reader.GetString("TITLE");
                        forum.AuthorName = reader.GetString("NAME");
                        forum.Picture = reader.GetString("PICTURE");
                    }
                }
            }
            connection.Close();
            return forum;
        }

        public List<Forum> GetUserForums(int user)
        {
            connection.Open();
            List<Forum> forums = new List<Forum>();
            string sql = "SELECT F.*, U.NAME AS AUTHORNAME FROM FORUMS F INNER JOIN USERS U ON (F.AUTHOR = U.ID) WHERE AUTHOR = ? ORDER BY F.ID DESC";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"AUTHOR", MySqlDbType.Int32).Value = user;
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Forum forum = new Forum();
                        forum.Id = reader.GetInt32("ID");
                        forum.Author = reader.GetInt32("AUTHOR");
                        forum.Text = reader.GetString("TEXT");
                        forum.Title = reader.GetString("TITLE");
                        forum.AuthorName = reader.GetString("AUTHORNAME");
                        forum.Picture = reader.GetString("PICTURE");
                        forums.Add(forum);
                    }
                }
            }
            connection.Close();
            return forums;
        }

        public bool UserHasFriends(int user)
        {
            var contagem = 0;
            connection.Open();
            string sql = "SELECT count(*) AS CONTAGEM FROM FRIENDS WHERE USER = ? OR FRIEND = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"USER", MySqlDbType.Int32).Value = user;
                command.Parameters.Add(@"FRIEND", MySqlDbType.Int32).Value = user;
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        contagem = reader.GetInt32("CONTAGEM");
                    }
                }
            }
            connection.Close();
            return contagem > 0;
        }
    }
}