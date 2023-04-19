using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Http.Headers;

namespace La_Cinópolis.Controllers
{
    [Route("api/Movies/Images")]
    [ApiController]
    public class ImagenesController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get(string nombreImagen)
        {
            var ruta = Path.Combine("Imagenes", nombreImagen);
            byte[] imagenBytes = System.IO.File.ReadAllBytes(ruta);
            return File(imagenBytes, "image/jpeg");
        }

    }
}
