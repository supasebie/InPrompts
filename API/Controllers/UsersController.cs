using API.DTOs;
using AutoMapper;
using API.Helpers;
using API.Entities;
using API.Interfaces;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {

        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IPhotoService _photoService;

        public UsersController(IUserRepository repo, IMapper mapper, IPhotoService photoService)
        {
            _photoService = photoService;
            _mapper = mapper;
            _repo = repo;
        }

        // [Authorize(Roles = "Member")]
        [HttpGet]
        public async Task<ActionResult<PagedList<MemberDto>>> GetUsers([FromQuery] UserParams userParams)
        {
            var currentUser = await _repo.GetUserByUsernameAsync(User.GetUsername());

            userParams.CurrentUsername = currentUser.UserName;
            if (String.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = currentUser.Gender == "male" ? "female" : "male";
            }

            var users = await _repo.GetMembersAsync(userParams);

            Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages));

            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<MemberDto>> GetUser(string username)
        {
            return await _repo.GetMemberAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(MemberUpdateDto memberUpdateDto)
        {
            var username = User.GetUsername();

            if (username != null)
            {
                var user = await _repo.GetUserByUsernameAsync(username);
                if (user == null)
                {
                    return NotFound();
                }

                _mapper.Map(memberUpdateDto, user);

                if (await _repo.SaveAllAsync())
                {
                    return NoContent();
                }
            }
            return BadRequest("Failed to update user");
        }

        [HttpPost("add-photo")]
        public async Task<ActionResult<PhotoDto>> AddPhoto(IFormFile file)
        {
            var user = await _repo.GetUserByUsernameAsync(User.GetUsername());

            if (user == null)
            {
                return NotFound();
            }

            var result = await _photoService.AddPhotoAsync(file);

            if (result.Error != null)
            {
                return BadRequest();
            }

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId
            };

            if (user.Photos.Count == 0)
            {
                photo.IsMain = true;
            }

            user.Photos.Add(photo);

            if (await _repo.SaveAllAsync())
            {
                // return _mapper.Map<PhotoDto>(photo);
                return CreatedAtAction(nameof(GetUser), new { username = user.UserName }, _mapper.Map<PhotoDto>(photo));
            }
            // }

            return BadRequest("Error uploading photo");
        }

        [HttpDelete("delete-photo/{id}")]
        public async Task<ActionResult> DeletePhoto(int id)
        {
            var user = await _repo.GetUserByUsernameAsync(User.GetUsername());

            if (user == null) return BadRequest("Invalid user");

            var photo = user.Photos.FirstOrDefault(x => x.Id == id);

            if (photo == null) return NotFound("Invalid photo");

            if (photo.IsMain) return BadRequest("Unable to delete main photo");

            if (photo.PublicId != null)
            {
                var result = await _photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null) return BadRequest(result.Error);

                user.Photos.Remove(photo);

                if (await _repo.SaveAllAsync())
                {
                    return Ok();
                }
            }
            return BadRequest("There was a problem deleting your photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var user = await _repo.GetUserByUsernameAsync(User.GetUsername());

            if (user == null) return BadRequest("Invalid user");

            var currentMain = user.Photos.FirstOrDefault(x => x.IsMain == true);

            if (currentMain == null) return BadRequest("No main photo, this should never happen");

            var photo = user.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return NotFound();

            if (photo.IsMain == true) return BadRequest("Photo is already set to main");

            photo.IsMain = true;

            currentMain.IsMain = false;

            if (await _repo.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("There was a problem setting your main photo");
        }
    }
}