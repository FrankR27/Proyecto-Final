using La_Cinópolis.Models.Request;
using La_Cinópolis.Models.Response;

namespace La_Cinópolis.Services
{
    public interface IUserService
    {
        UserResponse Auth(AuthRequest model);
        ResponseRegister Register(UserRegister model);
    }
}
