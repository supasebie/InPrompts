namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        public IUserRepository UserRepository { get; }
        public ILikesRepository LikesRepository { get; }
        public IMessageRepository MessageRepository { get; }
        public IPostRepository PostRepository { get; }
        
        public bool HasChanges();
        public Task<bool> SaveChanges();

    }
}