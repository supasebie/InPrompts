using AutoMapper;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using API.DTOs;

namespace API.Data
{
    public class PostRepository : IPostRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public PostRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;

        }
        public void AddComment(Comment comment)
        {
            _context.Comments.Add(comment);
        }

        public void CreatePost(Post post)
        {
            _context.Posts.Add(post);
        }

        public void DeletePost(Post post)
        {
            throw new NotImplementedException();
        }

        public Task<Post> GetPost()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<PostDto>> GetPosts()
        {
            var posts = await _context.Posts.OrderByDescending(x => x.CreatedDate)
            .Include(c => c.Comments)
            .ProjectTo<PostDto>(_mapper.ConfigurationProvider)
            .ToListAsync();

            return posts;
        }

        public void CreateComment(Comment comment)
        {
            _context.Comments.Add(comment);
        }
    }
}