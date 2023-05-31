using System.ComponentModel.DataAnnotations;
using API.Extensions;

namespace API.Entities
{
    public class AppUser
    {
        public int Id { get; set; }
        [Required]
        public string UserName { get; set; }  = null!;
        [Required]
        public byte[] PasswordHash { get; set; } = null!;
        [Required]
        public byte[] PasswordSalt { get; set; } = null!;
        public DateOnly DateOfBirth { get; set; } = DateOnly.FromDateTime(DateTime.UtcNow);
        public string? KnownAs { get; set; } = null!;
        public DateTime Created { get; set; } = DateTime.UtcNow;
        public DateTime LastActive { get; set; } = DateTime.UtcNow;
        public string? Gender { get; set; } = null!;
        public string? Introduction { get; set; } = null!;
        public string? LookingFor { get; set; } = null!;
        public string? Interests { get; set; } = null!;
        public List<Photo> Photos { get; set; } = new ();
    }
}