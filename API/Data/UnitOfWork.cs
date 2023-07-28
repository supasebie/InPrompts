using AutoMapper;
using API.Interfaces;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public UnitOfWork(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;   
        }
        public IUserRepository UserRepository => new UserRepository(_context, _mapper);

        public ILikesRepository LikesRepository => new LikesRepository(_context, _mapper);

        public IMessageRepository MessageRepository => new MessageRepository(_context, _mapper);

        public IPostRepository PostRepository => new PostRepository(_context, _mapper);

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}