using API.Entities;

namespace API.DTOs
{
    public class PostDto
    {
         public int Id { get; set; }
        public int AppUserId { get; set; }
        public string Prompt { get; set; }
        public string ImgUrl { get; set; }
        public IEnumerable<CommentDto> Comments { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}