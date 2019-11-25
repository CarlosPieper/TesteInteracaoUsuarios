using System.Collections.Generic;
using EmagrecerSocial.API.Interfaces;
using EmagrecerSocial.API.Models;
using MySql.Data.MySqlClient;

namespace EmagrecerSocial.API.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private MySqlConnection connection;
        public MessageRepository(MySqlConnection conn)
        {
            this.connection = conn;
        }

        public void Delete(int id)
        {
       
            string sql = "DELETE FROM MESSAGES WHERE ID = ?";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"ID", MySqlDbType.String).Value = id;
                command.ExecuteNonQuery();
            }
            ;
        }

        public void Include(Message message)
        {
       
            string sql = "INSERT INTO MESSAGES (TEXT, SENDER, RECEIVER) VALUES (?, ?, ?)";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                command.Parameters.Add(@"TEXT", MySqlDbType.String).Value = message.Text;
                command.Parameters.Add(@"SENDER", MySqlDbType.String).Value = message.MessageSender;
                command.Parameters.Add(@"RECEIVER", MySqlDbType.String).Value = message.MessageReceiver;
                command.ExecuteNonQuery();
            }
            ;
        }

        public List<Message> ListMessages()
        {
       
            List<Message> messages = new List<Message>();
            string sql = @"SELECT M.*, US.NAME AS SENDERNAME FROM MESSAGES M 
            INNER JOIN USERS US ON (M.SENDER = US.ID) 
            WHERE (SENDER = 1 AND RECEIVER = 2) OR (SENDER = 2 AND RECEIVER = 1)";
            using (MySqlCommand command = new MySqlCommand(sql, connection))
            {
                using (MySqlDataReader reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        Message message = new Message();
                        message.Id = reader.GetInt32("ID");
                        message.MessageSender = reader.GetInt32("SENDER");
                        message.Text = reader.GetString("TEXT");
                        message.MessageReceiver = reader.GetInt32("RECEIVER");
                        message.SenderName = reader.GetString("SENDERNAME");
                        messages.Add(message);
                    }
                }
            }
            ;
            return messages;
        }
    }
}