namespace La_Cinópolis.Models.Response
{
    public class UserResponse
    {
        public string Username { get; set; } = null!;

        public int Id { get; set; }
        public string Token { get; set; } = null!;
    }
}
