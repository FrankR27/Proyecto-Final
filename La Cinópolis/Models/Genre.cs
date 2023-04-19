using System;
using System.Collections.Generic;

namespace La_Cinópolis.Models
{
    public partial class Genre
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int UserId { get; set; }

        public virtual AspNetUser User { get; set; } = null!;
    }
}
