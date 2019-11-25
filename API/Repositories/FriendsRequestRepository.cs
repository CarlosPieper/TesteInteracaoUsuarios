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
            ;
        }

        public void InviteFriend(int idLogged, int id)
        {
            string sql = "INSERT INTO FRIENDS_REQUEST (REQUESTER, RECEIVER) VALUES (?,?)";
       
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"REQUESTER", MySqlDbType.Int32).Value = idLogged;
                command.Parameters.Add(@"RECEIVER", MySqlDbType.Int32).Value = id;
                command.ExecuteNonQuery();
            }
            ;
        }

        public List<FriendRequest> ListFriendRequests(int idLogged)
        {
            List<FriendRequest> listRequests = new List<FriendRequest>();
            string sql = @"SELECT F.REQUESTER, U.NAME, U.PROFILE_PIC FROM FRIENDS_REQUEST F INNER JOIN USERS U 
            ON (F.REQUESTER = U.ID) WHERE RECEIVER = ?;";
       
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"RECEIVER", MySqlDbType.Int32).Value = idLogged;
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        FriendRequest req = new FriendRequest();
                        req.Requester = reader.GetInt32("REQUESTER");
                        req.RequesterName = reader.GetString("NAME");
                        req.RequesterPicture = reader.GetString("PROFILE_PIC");
                        listRequests.Add(req);
                    }
                }
            }
            ;
            return listRequests;
        }

        public bool VerifyFriendRequest(int idLogged, int id)
        {
            var contagem = 0;
       
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
            ;
            return contagem > 0;
        }
    }
}