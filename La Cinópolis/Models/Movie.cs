using System;
using System.Collections.Generic;

namespace La_Cinópolis.Models
{
    public partial class Movie
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime ReleaseDate { get; set; }
        public string Genre { get; set; } = null!;
        public string FilePath { get; set; } = null!;
        public int UserId { get; set; }

        public virtual AspNetUser User { get; set; } = null!;
    }
}
