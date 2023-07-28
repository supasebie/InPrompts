using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MessagesController : BaseApiController
    {
        private readonly IUnitOfWork _work;
        private readonly IMapper _mapper;
        public MessagesController(IUnitOfWork work, IMapper mapper)
        {
            _mapper = mapper;
            _work = work;
        }

        [HttpGet]
        public async Task<ActionResult<PagedList<MessageDto>>> GetMessagesForUser([FromQuery] MessageParams messageParams)
        {
            messageParams.CurrentUsername = User.GetUsername();
            var messages = await _work.MessageRepository.GetMessagesForUser(messageParams);

            Response.AddPaginationHeader(new PaginationHeader(messages.CurrentPage, messages.PageSize, messages.TotalCount, messages.TotalPages));

            return messages;
        }

        [HttpPost]
        public async Task<ActionResult> CreateMessage(CreateMessageDto message)
        {
            var senderUserName = User.GetUsername();
            if (message.RecipientUsername.ToLower() == senderUserName.ToLower()) return BadRequest("Unable to send message to self");

            var sender = await _work.UserRepository.GetUserByUsernameAsync(senderUserName);

            var recipient = await _work.UserRepository.GetUserByUsernameAsync(message.RecipientUsername);
            if (recipient == null) BadRequest("Recipient not found");

            var messageToAdd = new Message()
            {
                Sender = sender,
                Recipient = recipient,
                SenderUsername = senderUserName,
                RecipientUsername = message.RecipientUsername,
                Content = message.Content
            };

            _work.MessageRepository.AddMessage(messageToAdd);

            if (await _work.MessageRepository.SaveAllAsync())
            {
                return Ok(_mapper.Map<MessageDto>(messageToAdd));
            }

            return BadRequest("Unable to send message");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(int id)
        {
            var userId = User.GetUserId();

            var message = await _work.MessageRepository.GetMessage(id);

            if (userId != message.SenderId && userId != message.RecipientId)
            {
                return Unauthorized();
            }

            if (message.SenderId == userId) message.SenderDeleted = true;
            if (message.RecipientId == userId) message.RecipientDeleted = true;

            if (message.SenderDeleted && message.RecipientDeleted) _work.MessageRepository.DeleteMessage(message);
            
            if (await _work.MessageRepository.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("Unable to delete message");
        }

        [HttpGet("thread/{recipientUsername}")]
        public async Task<ActionResult> GetMessageThread(string recipientUsername)
        {
            var sourceUserId = User.GetUserId();

            var thread = await _work.MessageRepository.GetMessageThread(sourceUserId, recipientUsername);

            return Ok(thread);
        }

    }
}