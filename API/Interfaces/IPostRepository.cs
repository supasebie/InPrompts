using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPostRepository
    {
        Task<IEnumerable<PostDto>> GetPosts();
        Task<Post> GetPost();
        void CreatePost(Post post);
        void AddComment(Comment comment);
        void DeletePost(Post post);
    }
}