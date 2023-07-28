using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
            
        }

        public required DbSet<AppUser> Users { get; set; }
        public required DbSet<UserLike> Likes { get; set; }
        public required DbSet<Message> Messages { get; set; }
        public required DbSet<Post> Posts { get; set; }
        public required DbSet<Comment> Comments {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserLike>()
            .HasKey(k => new {k.SourceUserId, k.TargetUserId});

            modelBuilder.Entity<UserLike>()
            .HasOne(s => s.SourceUser)
            .WithMany(l => l.LikedUsers)
            .HasForeignKey(s => s.SourceUserId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserLike>()
            .HasOne(s => s.TargetUser)
            .WithMany(l => l.LikedByUsers)
            .HasForeignKey(s => s.TargetUserId)
            .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Message>()
            .HasOne(s=> s.Sender)
            .WithMany(r => r.MessagesSent)
            .HasForeignKey(s => s.SenderId)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
            .HasOne(s=> s.Sender)
            .WithMany(r => r.MessagesSent)
            .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
            .HasOne(s => s.Recipient)
            .WithMany(r => r.MessagesRecieved)
            .OnDelete(DeleteBehavior.Restrict);
        }
    }
}