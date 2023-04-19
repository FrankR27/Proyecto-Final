using La_Cinópolis.Models;
using La_Cinópolis.Models.Helpers;
using La_Cinópolis.Models.Request;
using La_Cinópolis.Models.Response;
using La_Cinópolis.Tools;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace La_Cinópolis.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;

        public UserService(IOptions<AppSettings> appSettings)
        {
            _appSettings = appSettings.Value;
        }

        public UserResponse Auth(AuthRequest model)
        {
            UserResponse userResponse = new UserResponse();
            
            using (var db = new MovieDBContext())
            {
                string spaddword = Encrypt.GetSHA256(model.Password);

                var usuario = db.AspNetUsers.Where(e => e.UserName == model.Username && e.Password == spaddword).FirstOrDefault();

                if (usuario == null) return null;

                userResponse.Username = usuario.UserName;
                userResponse.Id = usuario.Id;
                userResponse.Token = GenerateToken(usuario);
            }

            return userResponse;
        }

        private string GenerateToken(AspNetUser usuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(60),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        public ResponseRegister Register(UserRegister model)
        {
           ResponseRegister userResponse = new ResponseRegister();

            using (var db = new MovieDBContext())
            {
                string spaddword = Encrypt.GetSHA256(model.Password);

                var usuario = db.AspNetUsers.Where(e => e.UserName == model.Username).FirstOrDefault();

                if (usuario == null)
                {
                    AspNetUser user = new AspNetUser();
                    user.UserName = model.Username;
                    user.Password = spaddword;
                    user.Email = model.Email;
                    db.AspNetUsers.Add(user);
                    db.SaveChanges();

                    userResponse.Username = user.UserName;
                    userResponse.Email = user.Email;
                }
            }

            return userResponse;
        }
    }
}
