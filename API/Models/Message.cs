namespace EmagrecerSocial.API.Models
{
    public class Message
    {
        public int Id { get; set; }
        public int MessageSender { get; set; }
        public string Text { get; set; }
        public string SenderName { get; set; }
    }
}