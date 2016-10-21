using System;

namespace AspTests.Models
{
    public class OmdbFilm
    {
        public string Title { get; set; }
        public int Year { get; set; }
        public string Rated { get; set; }
        public DateTime Released { get; set; }
        public string Runtime { get; set; }
        public string Genre { get; set; }
        public string imdbID { get; set; }
    }
}
