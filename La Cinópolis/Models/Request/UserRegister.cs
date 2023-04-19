using System.ComponentModel.DataAnnotations;

namespace La_Cinópolis.Models.Request
{
    public class UserRegister
    {
        [Required]
        public string Username { get; set; } = null!;
        [Required]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }
}
