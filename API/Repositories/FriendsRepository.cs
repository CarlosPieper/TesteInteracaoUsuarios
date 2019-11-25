using System;
using System.Collections.Generic;
using EmagrecerSocial.API.Interfaces;
using EmagrecerSocial.API.Models;
using MySql.Data.MySqlClient;

namespace EmagrecerSocial.API.Repositories
{
    public class FriendsRepository : IFriendsRepository
    {
        IUtilitiesRepository utilities;
        private MySqlConnection connection;
        public FriendsRepository(MySqlConnection conn, IUtilitiesRepository _utilities)
        {
            this.connection = conn;
            this.utilities = _utilities;
        }

        public void Accept(int idLogged, int id)
        {
            string sql = "INSERT INTO FRIENDS (USER, FRIEND) VALUES (?,?)";

            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"USER", MySqlDbType.Int32).Value = idLogged;
                command.Parameters.Add(@"FRIEND", MySqlDbType.Int32).Value = id;
                command.ExecuteNonQuery();
            }
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"FRIEND", MySqlDbType.Int32).Value = id;
                command.Parameters.Add(@"USER", MySqlDbType.Int32).Value = idLogged;
                command.ExecuteNonQuery();
            }
        }

        public void Delete(int idLogged, int id)
        {
            string sql = "DELETE FROM FRIENDS WHERE USER = ? AND FRIEND = ?";

            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"USER", MySqlDbType.Int32).Value = id;
                command.Parameters.Add(@"FRIEND", MySqlDbType.Int32).Value = idLogged;
                command.ExecuteNonQuery();
            }
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"USER", MySqlDbType.Int32).Value = idLogged;
                command.Parameters.Add(@"FRIEND", MySqlDbType.Int32).Value = id;
                command.ExecuteNonQuery();
            }
        }

        public List<User> ListFriends(int id)
        {

            List<User> users = new List<User>();
            string sql = @"SELECT U.* FROM FRIENDS F INNER JOIN USERS U ON (F.FRIEND = U.ID) WHERE F.USER = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"USER", MySqlDbType.String).Value = id;
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        User user = new User();
                        user.Id = reader.GetInt32("ID");
                        user.Name = reader.GetString("NAME");
                        user.Password = reader.GetString("PASSWORD");
                        user.RegistrationDate = utilities.JulianToDate(reader.GetInt32("REGISTRATION_DATE"));
                        user.Email = reader.GetString("EMAIL");
                        user.City = reader.GetString("CITY");
                        user.Cpf = reader.GetString("CPF");
                        user.BirthDate = utilities.JulianToDate(reader.GetInt32("BIRTH_DATE"));
                        user.Genre = reader.GetString("GENRE");
                        user.Description = reader.GetString("DESCRIPTION");
                        user.ProfilePic = reader.GetString("PROFILE_PIC");
                        user.CoverPic = reader.GetString("COVER_PIC");
                        users.Add(user);
                    }
                }
            }
            return users;
        }

        public bool VerifyFriendship(int idLogged, int id)
        {
            int contagem = 0;
            string sql = "SELECT COUNT(*) AS CONTAGEM FROM FRIENDS WHERE USER = ? AND FRIEND = ?";

            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"USER", MySqlDbType.String).Value = id;
                command.Parameters.Add(@"FRIEND", MySqlDbType.String).Value = idLogged;
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        contagem = reader.GetInt32("CONTAGEM");
                    }
                }
            }
            return contagem > 0;
        }
    }
}