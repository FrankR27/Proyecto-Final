using La_Cinópolis.Models;
using La_Cinópolis.Models.DTO;
using La_Cinópolis.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using System.Net.Http;
using System.Web.Http;

namespace La_Cinópolis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MoviesController : ControllerBase
    {

        [HttpGet("user/{userId}")]
        public IActionResult Get(int userId)
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.IsSuccess = false;
            try
            {
                using (var db = new MovieDBContext())
                {
                    oRespuesta.IsSuccess = true;
                    oRespuesta.Result = db.Movies.Where(x => x.UserId == userId).ToList();
                    oRespuesta.Message = "Lista de películas";
                    return Ok(oRespuesta);
                }
            }
            catch (Exception ex)
            {
                oRespuesta.IsSuccess = false;
                oRespuesta.Message = ex.Message;
            }

            return Ok(oRespuesta);
        }

        [HttpGet("{id}")]
        public IActionResult GetMovie(int id)
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.IsSuccess = false;
            try
            {
                using (var db = new MovieDBContext())
                {
                    oRespuesta.IsSuccess = true;
                    oRespuesta.Result = db.Movies.Where(x => x.Id == id).FirstOrDefault();
                    oRespuesta.Message = "Pelicula";
                    return Ok(oRespuesta);
                }
            }
            catch (Exception ex)
            {
                oRespuesta.IsSuccess = false;
                oRespuesta.Message = ex.Message;
            }

            return Ok(oRespuesta);
        }

        [HttpPost]
        public async Task<IActionResult> Add([FromForm] MovieDto movieDto)
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.IsSuccess = false;
            try
            {

                using (var db = new MovieDBContext())
                {
                    var user = await db.AspNetUsers.FindAsync(movieDto.UserId);

                    var ruta = Path.Combine("Imagenes", Guid.NewGuid().ToString() + Path.GetExtension(movieDto.FilePath.FileName));
                    using (var stream = new FileStream(ruta, FileMode.Create))
                    {
                        await movieDto.FilePath.CopyToAsync(stream);
                    }

                    var movie = new Movie
                    {
                        Title =  movieDto.Title,
                        Description = movieDto.Description,
                        ReleaseDate = movieDto.ReleaseDate,
                        Genre = movieDto.Genre,
                        FilePath = ruta,
                        UserId = movieDto.UserId,
                        User = user
                    };

                    db.Movies.Add(movie);
                    db.SaveChanges();
                    oRespuesta.IsSuccess = true;
                    oRespuesta.Message = "Pelicula agregada con exito";
                    return Ok(oRespuesta);
                }
            }

            catch (Exception ex)
            {
                oRespuesta.IsSuccess = false;
                oRespuesta.Message = ex.Message;
            }

            return Ok(oRespuesta);
        }

        [HttpPut("{id}")]
        public IActionResult Update([FromForm] MovieDto movie)
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.IsSuccess = false;
            try
            {

                using (var db = new MovieDBContext())
                {
                    var user = db.AspNetUsers.Find(movie.UserId);

                    var movieUpdate = db.Movies.Find(movie.Id);

                    movieUpdate.Title = movie.Title;
                    movieUpdate.Description = movie.Description;
                    movieUpdate.ReleaseDate = movie.ReleaseDate;
                    movieUpdate.Genre = movie.Genre;
                    if (movie.FilePath != null)
                    {
                        var ruta = Path.Combine("Imagenes", Guid.NewGuid().ToString() + Path.GetExtension(movie.FilePath.FileName));
                        using (var stream = new FileStream(ruta, FileMode.Create))
                        {
                            movie.FilePath.CopyTo(stream);
                        }

                        System.IO.File.Delete(movieUpdate.FilePath);
                        movieUpdate.FilePath = ruta;
                    }
                    movieUpdate.UserId = movie.UserId;
                    movieUpdate.User = user;
                    db.Entry(movieUpdate).State = EntityState.Modified;
                    db.SaveChanges();
                    oRespuesta.IsSuccess = true;
                    oRespuesta.Message = "Pelicula actualizada con exito";
                    return Ok(oRespuesta);
                }
            }

            catch (Exception ex)
            {
                oRespuesta.IsSuccess = false;
                oRespuesta.Message = ex.Message;
            }

            return Ok(oRespuesta);
        }

        [HttpDelete]
        public IActionResult Delete(int id)
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.IsSuccess = false;
            try
            {
                using (var db = new MovieDBContext())
                {
                    var movie = db.Movies.Find(id);
                    db.Movies.Remove(movie);
                    db.SaveChanges();
                    oRespuesta.IsSuccess = true;
                    oRespuesta.Message = "Pelicula eliminada con exito";
                    return Ok(oRespuesta);
                }
            }

            catch (Exception ex)
            {
                oRespuesta.IsSuccess = false;
                oRespuesta.Message = ex.Message;
            }

            return Ok(oRespuesta);
        }

    }
}
