using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using AspTests.Data;
using AspTests.Models;
using System.Net.Http;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;

namespace AspTests.Controllers
{
    [Authorize]
    public class FilmsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public FilmsController(ApplicationDbContext context)
        {
            _context = context;    
        }

        // GET: Films
        public async Task<IActionResult> Index()
        {
            return View(await _context.Film.ToListAsync());
        }

        // GET: Films/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var film = await _context.Film.SingleOrDefaultAsync(m => m.ID == id);
            if (film == null)
            {
                return NotFound();
            }

            return View(film);
        }

        // GET: Films/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: Films/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("ID,AddedBy,Title")] Film film)
        {
            if (ModelState.IsValid)
            {
                _context.Add(film);
                await _context.SaveChangesAsync();
                return RedirectToAction("Index");
            }
            return View(film);
        }

        // GET: Films/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var film = await _context.Film.SingleOrDefaultAsync(m => m.ID == id);
            if (film == null)
            {
                return NotFound();
            }
            return View(film);
        }

        // POST: Films/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("ID,AddedBy,Title")] Film film)
        {
            if (id != film.ID)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(film);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!FilmExists(film.ID))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction("Index");
            }
            return View(film);
        }

        // GET: Films/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var film = await _context.Film.SingleOrDefaultAsync(m => m.ID == id);
            if (film == null)
            {
                return NotFound();
            }

            return View(film);
        }

        // POST: Films/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var film = await _context.Film.SingleOrDefaultAsync(m => m.ID == id);
            _context.Film.Remove(film);
            await _context.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        private bool FilmExists(int id)
        {
            return _context.Film.Any(e => e.ID == id);
        }

        public async Task<IActionResult> ImdbPage(int id, string title)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://www.omdbapi.com/");
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new System.Net.Http.Headers.MediaTypeWithQualityHeaderValue("application/json"));

                var titleEncoded = System.Net.WebUtility.UrlEncode(title);

                var parameters = String.Format("?t={0}&y=&plot=short&r=json", titleEncoded);

                HttpResponseMessage response = await client.GetAsync(parameters);
                if (response.IsSuccessStatusCode)
                {
                    //OmdbFilm filmResponse = await response.Content.ReadAsAsync<OmdbFilm>();
                    var filmResponse = await response.Content.ReadAsStringAsync()
                        .ContinueWith(getTask =>
                        {
                            return JsonConvert.DeserializeObject<OmdbFilm>(getTask.Result);
                        });

                    var imdbUrl = "http://www.imdb.com/title/" + filmResponse.imdbID;
                    return Redirect(imdbUrl);
                }
            }

            return RedirectToAction("Index");
        }
        
    }
}
