using System.Collections.Generic;
using EmagrecerSocial.API.Interfaces;
using EmagrecerSocial.API.Models;
using MySql.Data.MySqlClient;

namespace EmagrecerSocial.API.Repositories
{
    public class FriendsRequestRepository : IFriendsRequestRepository
    {
        private MySqlConnection connection;
        public FriendsRequestRepository(MySqlConnection conn)
        {
            this.connection = conn;
        }

        public void Delete(int idLogged, int id)
        {
            string sql = "DELETE FROM FRIENDS_REQUEST WHERE REQUESTER = ? AND RECEIVER = ?";
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"REQUESTER", MySqlDbType.Int32).Value = id;
                command.Parameters.Add(@"RECEIVER", MySqlDbType.Int32).Value = idLogged;
                command.ExecuteNonQuery();
            }
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"REQUESTER", MySqlDbType.Int32).Value = idLogged;
                command.Parameters.Add(@"RECEIVER", MySqlDbType.Int32).Value = id;
                command.ExecuteNonQuery();
            }
            connection.Close();
        }

        public void InviteFriend(int idLogged, int id)
        {
            string sql = "INSERT INTO FRIENDS_REQUEST (REQUESTER, RECEIVER) VALUES (?,?)";
            connection.Open();
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"REQUESTER", MySqlDbType.Int32).Value = idLogged;
                command.Parameters.Add(@"RECEIVER", MySqlDbType.Int32).Value = id;
                command.ExecuteNonQuery();
            }
            connection.Close();
        }

        public bool VerifyFriendRequest(int idLogged, int id)
        {
            var contagem = 0;
            connection.Open();
            string sql = "SELECT COUNT(*) AS CONTAGEM FROM FRIENDS_REQUEST WHERE REQUESTER = ? AND RECEIVER = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"REQUESTER", MySqlDbType.Int32).Value = idLogged;
                command.Parameters.Add(@"RECEIVER", MySqlDbType.Int32).Value = id;
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