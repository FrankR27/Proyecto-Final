using Microsoft.Build.Framework;
using System;
using System.Collections.Generic;

namespace La_Cinópolis.Models.DTO
{
    public class MovieDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public DateTime ReleaseDate { get; set; }
        [Required]
        public string Genre { get; set; }
        public IFormFile? FilePath { get; set; }
        [Required]
        public int UserId { get; set; }
    }
}
