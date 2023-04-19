using La_Cinópolis.Models;
using La_Cinópolis.Models.DTO;
using La_Cinópolis.Models.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace La_Cinópolis.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GenreController : ControllerBase
    {
        [HttpGet("user/{userId}")]
        public IActionResult GetGenre(int userId)
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.IsSuccess = false;
            try
            {
                using (var db = new MovieDBContext())
                {
                    oRespuesta.IsSuccess = true;
                    oRespuesta.Result = db.Genres.Where(x => x.UserId == userId).ToList();
                    oRespuesta.Message = "Lista de géneros";
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

        // GET api/<GenreController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.IsSuccess = false;
            try
            {
                using (var db = new MovieDBContext())
                {
                    oRespuesta.Result = db.Genres.Find(id);
                    oRespuesta.IsSuccess = true;
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

        // POST api/<GenreController>
        [HttpPost]
        public async Task<IActionResult> Post([FromForm] GenreDto genre)
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.IsSuccess = false;

            try
            {
                using (var db = new MovieDBContext())
                {
                    var user = await db.AspNetUsers.FindAsync(genre.UserId);


                    if (user == null)
                    {
                        oRespuesta.IsSuccess = false;
                        oRespuesta.Message = "Usuario no encontrado";
                        return Ok(oRespuesta);
                    }

                    var genreP = new Genre
                    {
                        Name = genre.Name,
                        UserId = genre.UserId
                    };

                    db.Genres.Add(genreP);
                    db.SaveChanges();
                    oRespuesta.Message = "Género creado con éxito";
                    oRespuesta.IsSuccess = true;
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

        // PUT api/<GenreController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Genre genre)
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.IsSuccess = false;
            try
            {
                using (var db = new MovieDBContext())
                {
                    var oGenre = db.Genres.Find(id);
                    oGenre.Name = genre.Name;
                    oGenre.UserId = genre.UserId;
                    db.Entry(oGenre).State = EntityState.Modified;
                    db.SaveChanges();
                    oRespuesta.Result = oGenre;
                    oRespuesta.IsSuccess = true;
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

        // DELETE api/<GenreController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            Respuesta oRespuesta = new Respuesta();
            oRespuesta.IsSuccess = false;
            try
            {
                using (var db = new MovieDBContext())
                {
                    var oGenre = db.Genres.Find(id);
                    db.Genres.Remove(oGenre);
                    db.SaveChanges();
                    oRespuesta.Result = oGenre;
                    oRespuesta.IsSuccess = true;
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
