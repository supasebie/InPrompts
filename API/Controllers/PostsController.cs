using API.DTOs;
using AutoMapper;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PostsController : BaseApiController
    {
        private readonly IUnitOfWork _unit;
        private readonly IMapper _mapper;

        public PostsController(IUnitOfWork unit, IMapper mapper)
        {
            _mapper = mapper;
            _unit = unit;
        }

        [HttpPost]
        public async Task<ActionResult> CreatePost([FromBody]Post post)
        {
            var userId = User.GetUserId();

            post.AppUserId = userId;

            _unit.PostRepository.CreatePost(post);

            if(await _unit.SaveChanges())
            {
                return Ok();
            }

            return BadRequest("Error creating post");
        }

        [HttpGet]
        public async Task<ActionResult<List<PostDto>>> GetPosts()
        {
            var posts = await _unit.PostRepository.GetPosts();

            return Ok(posts);
            
        }

        [HttpPost("comment/{postId}")]
        public async Task<ActionResult> CreateComment([FromBody] Comment comment, int postId)
        {
            var userId = User.GetUserId();

            comment.AppUserId = userId;
            comment.PostId = postId;

            _unit.PostRepository.AddComment(comment);

            if(await _unit.SaveChanges())
            {
                return Ok();
            }

            return BadRequest();
        }
    }
}