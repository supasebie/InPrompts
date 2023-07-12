using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ILikesRepository
    {
        Task<UserLike> GetLike(int sourceUserId, int targetUserId);
        Task<PagedList<LikeDto>> GetLikes(LikesParams likesParams);
        Task<AppUser> GetUserWithLikes(int userId);
        Task<bool> SaveAllAsync();
    }
}