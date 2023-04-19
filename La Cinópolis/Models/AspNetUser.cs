using System;
using System.Collections.Generic;

namespace La_Cinópolis.Models
{
    public partial class AspNetUser
    {
        public AspNetUser()
        {
            Genres = new HashSet<Genre>();
            Movies = new HashSet<Movie>();
        }

        public int Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;

        public virtual ICollection<Genre> Genres { get; set; }
        public virtual ICollection<Movie> Movies { get; set; }
    }
}
