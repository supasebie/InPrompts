using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("Comments")]
    public class Comment
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int AppUserId { get; set; }
        public AppUser AppUser { get; set; }
        public Post Post { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    }
}