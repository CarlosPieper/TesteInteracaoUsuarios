namespace EmagrecerSocial.API.Models
{
    public class Forum
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int Author { get; set; }
        public string Text { get; set; }
        public string AuthorName { get; set; }
        public string Picture { get; set; }
    }
}