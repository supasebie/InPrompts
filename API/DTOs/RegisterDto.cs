using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username { get; set; } = null!;

        [Required]
        [StringLength(8, MinimumLength = 4 )]
        public string Password { get; set; } = null!;

        public string KnownAs { get; set; }

        public DateOnly DateOfBirth { get; set; }

        public string City { get; set; }

        public string Country { get; set; }

        public string Gender { get; set; }

    }
}