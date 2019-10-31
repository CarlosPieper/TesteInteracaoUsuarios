namespace EmagrecerSocial.API.Models
{
    public class ForumComment
    {
        public int Id { get; set; }
        public int Forum { get; set; }
        public int Author { get; set; }
        public string Text { get; set; }
        public string AuthorName { get; set; }
    }
}