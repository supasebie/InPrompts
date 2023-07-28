using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CommentDto
    {
        public int Id { get; set; }
        public int PostId { get; set; }
        public int AppUserId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}