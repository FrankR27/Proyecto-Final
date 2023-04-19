using La_Cinópolis.Models;
using La_Cinópolis.Models.Request;
using La_Cinópolis.Models.Response;
using La_Cinópolis.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace La_Cinópolis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public IActionResult Autentificar([FromBody] AuthRequest model)
        {
            Respuesta respuesta = new Respuesta();
            
            var userResponse = _userService.Auth(model);

            if (userResponse == null)
            {
                respuesta.IsSuccess = false;
                respuesta.Message = "Usuario o contraseña incorrectos";
                return Ok(respuesta);
            }

            respuesta.IsSuccess = true;
            respuesta.Message = "Usuario autenticado con exito";
            respuesta.Result = userResponse;

            return Ok(respuesta);
        }

        [HttpPost("register")]
        public IActionResult Registrar([FromBody] UserRegister model)
        {

            Respuesta respuesta = new Respuesta();

            if (!ModelState.IsValid)
            {
                respuesta.IsSuccess = false;
                respuesta.Message = "Datos incorrectos";
                return Ok(respuesta);
            }

            var userResponse = _userService.Register(model);

            if (userResponse == null)
            {
                respuesta.IsSuccess = false;
                respuesta.Message = "El usuario ya existe";
                return Ok(respuesta);
            }

            respuesta.IsSuccess = true;
            respuesta.Message = "Usuario registrado con exito";
            respuesta.Result = userResponse;

            return Ok(respuesta);
        }

    } 
}
