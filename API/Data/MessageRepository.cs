using API.DTOs;
using AutoMapper;
using API.Helpers;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;

namespace API.Data
{
    public class MessageRepository : IMessageRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public MessageRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public void AddMessage(Message message)
        {
            _context.Messages.Add(message);
        }

        public void DeleteMessage(Message message)
        {
            _context.Messages.Remove(message);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FindAsync(id);
        }

        public async Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams)
        {
            var query = _context.Messages
            .AsQueryable();

            query = messageParams.Container switch
            {
                "Inbox" => query.Where(u => u.RecipientUsername == messageParams.CurrentUsername && u.RecipientDeleted != true ),
                "Outbox" => query.Where(u => u.SenderUsername == messageParams.CurrentUsername && u.SenderDeleted != true),
                _ => query.Where(u => u.RecipientUsername == messageParams.CurrentUsername && u.DateRead == null && u.RecipientDeleted != true)
            };

            var messages = query.ProjectTo<MessageDto>(_mapper.ConfigurationProvider);

            return await PagedList<MessageDto>.CreateAsync(messages, messageParams.PageNumber, messageParams.PageSize);
        }

        public async Task<IEnumerable<MessageDto>> GetMessageThread(int userId, string recipientUsername)
        {
            var messages = await _context.Messages
            .Include(u => u.Sender).ThenInclude(p => p.Photos)
            .Include(u => u.Recipient).ThenInclude(p => p.Photos)
            .Where(m => (m.RecipientId == userId && m.SenderUsername == recipientUsername && m.RecipientDeleted != true) 
            ||
            (m.SenderId == userId && m.RecipientUsername == recipientUsername && m.SenderDeleted != true))
            .OrderBy(m => m.DateSent)
            .ToListAsync();

            // We use ToList() here because we have the messages in memory already, we do not have to use
            // ToListAsync() and hit the database again.
            var unreadMessages = messages.Where(m => m.DateRead == null && m.RecipientId == userId).ToList();

            if (unreadMessages.Any())
            {
                foreach (var message in unreadMessages)
                {
                    message.DateRead = DateTime.UtcNow;
                }
                await _context.SaveChangesAsync();
            }

            return _mapper.Map<IEnumerable<MessageDto>>(messages);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}