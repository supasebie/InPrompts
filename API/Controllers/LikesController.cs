using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LikesController : BaseApiController
    {
        private readonly ILikesRepository _likeRepo;
        private readonly IUserRepository _userRepo;
        public LikesController(ILikesRepository likeRepo, IUserRepository userRepo)
        {
            _userRepo = userRepo;
            _likeRepo = likeRepo;
        }

        [HttpPost("{username}")]
        public async Task<ActionResult> AddLike(string username)
        {
            var likedUser = await _userRepo.GetUserByUsernameAsync(username);
            if (likedUser == null) return NotFound("User not found");

            var sourceUserId = User.GetUserId();
            var sourceUser = await _likeRepo.GetUserWithLikes(sourceUserId);
            if (sourceUser.UserName == username) return BadRequest("Unable to like yourself");

            var like = await _likeRepo.GetLike(sourceUserId, likedUser.Id);

            if (like != null) return BadRequest("You have already liked this user");

            var userLike = new UserLike
            {
                SourceUserId = sourceUserId,
                TargetUserId = likedUser.Id
            };

            sourceUser.LikedUsers.Add(userLike);

            if (await _userRepo.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("Add like returned an error");

        }

        [HttpGet]
        public async Task<ActionResult<PagedList<LikeDto>>> GetUserLikes([FromQuery]LikesParams likesParams)
        {
            likesParams.UserId  = User.GetUserId();

            var likes = await _likeRepo.GetLikes(likesParams);

            Response.AddPaginationHeader(new PaginationHeader(likes.CurrentPage, likes.PageSize, likes.TotalCount, likes.TotalPages));

            return Ok(likes);

        }

    }
}