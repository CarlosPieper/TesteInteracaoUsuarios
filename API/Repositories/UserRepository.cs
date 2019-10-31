using System;
using System.Collections.Generic;
using EmagrecerSocial.API.Interfaces;
using EmagrecerSocial.API.Models;
using MySql.Data.MySqlClient;

namespace EmagrecerSocial.API.Repositories
{
    public class UserRepository : IUserRepository
    {
        IUtilitiesRepository utilities;
        private MySqlConnection connection;
        public UserRepository(MySqlConnection conn, IUtilitiesRepository _utilities)
        {
            this.connection = conn;
            this.utilities = _utilities;
        }

        public void ChangePassword(string password, string email)
        {
            string sql = @"UPDATE USERS SET PASSWORD = ? WHERE EMAIL = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@PASSWORD", MySqlDbType.String).Value = password;
                command.Parameters.Add("@EMAIL", MySqlDbType.String).Value = email;
                command.ExecuteNonQuery();
            }
        }

        public void Edit(User user)
        {
            string sql = @"UPDATE USERS SET NAME = ?, PASSWORD = ?, BIRTH_DATE = ?, GENRE = ?, 
            EMAIL = ?, CPF = ?, CITY = ?, DESCRIPTION = ?, PROFILE_PIC = ?, COVER_PIC = ? WHERE ID = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@NAME", MySqlDbType.String).Value = user.Name;
                command.Parameters.Add("@PASSWORD", MySqlDbType.String).Value = user.Password;
                command.Parameters.Add("@BIRTH_DATE", MySqlDbType.Int32).Value = utilities.DateTimeToJulian(user.BirthDate);
                command.Parameters.Add("@GENRE", MySqlDbType.String).Value = user.Genre;
                command.Parameters.Add("@EMAIL", MySqlDbType.String).Value = user.Email;
                command.Parameters.Add("@CPF", MySqlDbType.String).Value = user.Cpf;
                command.Parameters.Add("@CITY", MySqlDbType.String).Value = user.City;
                command.Parameters.Add("@DESCRIPTION", MySqlDbType.String).Value = user.Description;
                command.Parameters.Add("@PROFILE_PIC", MySqlDbType.String).Value = user.ProfilePic;
                command.Parameters.Add("@COVER_PIC", MySqlDbType.String).Value = user.CoverPic;
                command.Parameters.Add("@ID", MySqlDbType.Int32).Value = user.Id;
                command.ExecuteNonQuery();
            }
        }

        public void Include(User user)
        {
            string sql = @"INSERT INTO USERS (NAME, PASSWORD, REGISTRATION_DATE, BIRTH_DATE, GENRE, EMAIL, CPF, CITY, DESCRIPTION, PROFILE_PIC, COVER_PIC) 
            VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@NAME", MySqlDbType.String).Value = user.Name;
                command.Parameters.Add("@PASSWORD", MySqlDbType.String).Value = user.Password;
                command.Parameters.Add("@REGISTRATION_DATE", MySqlDbType.Int32).Value = utilities.DateTimeToJulian(user.RegistrationDate);
                command.Parameters.Add("@BIRTH_DATE", MySqlDbType.Int32).Value = utilities.DateTimeToJulian(user.BirthDate);
                command.Parameters.Add("@GENRE", MySqlDbType.String).Value = " ";
                command.Parameters.Add("@EMAIL", MySqlDbType.String).Value = user.Email;
                command.Parameters.Add("@CPF", MySqlDbType.String).Value = " ";
                command.Parameters.Add("@CITY", MySqlDbType.String).Value = user.City;
                command.Parameters.Add("@DESCRIPTION", MySqlDbType.String).Value = " ";
                command.Parameters.Add("@PROFILE_PIC", MySqlDbType.String).Value = " ";
                command.Parameters.Add("@COVER_PIC", MySqlDbType.String).Value = " ";
                command.ExecuteNonQuery();
            }
        }

        public List<User> ListFriends(int id)
        {
            List<User> users = new List<User>();
            string sql = @"SELECT U.* FROM FRIENDS F INNER JOIN USERS U ON (F.USER = U.ID) WHERE F.USER = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@USER", MySqlDbType.String).Value = id;
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

        public User Login(string email, string password)
        {
            User user = new User();
            string sql = @"SELECT * FROM USERS WHERE EMAIL = ? AND PASSWORD = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@EMAIL", MySqlDbType.String).Value = email;
                command.Parameters.Add("@PASSWORD", MySqlDbType.String).Value = password;
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
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
                    }
                }
            }
            return user;
        }

        public List<User> SearchByName(string name)
        {
            List<User> users = new List<User>();
            string sql = @"SELECT * FROM USERS WHERE NAME LIKE ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@NAME", MySqlDbType.String).Value = "%" + name + "%";
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

        public User SearchForId(int id)
        {
            User user = new User();
            string sql = @"SELECT * FROM USERS WHERE ID = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@ID", MySqlDbType.String).Value = id;
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
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
                    }
                }
            }
            return user;
        }

        public bool VerifyEmail(string email)
        {
            string sql = @"SELECT * FROM USERS WHERE EMAIL = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add("@EMAIL", MySqlDbType.String).Value = email;
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    if (reader.Read())
                    {
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
            }
        }
    }
}