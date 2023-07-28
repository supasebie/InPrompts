using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities

{
    [Table("Posts")]
    public class Post
    {
        public int Id { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public string Prompt { get; set; }
        public string ImgUrl { get; set; }
        public List<Comment> Comments { get; set; } = new ();
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}