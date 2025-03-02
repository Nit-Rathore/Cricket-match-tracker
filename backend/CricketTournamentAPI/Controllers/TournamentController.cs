using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CricketTournamentAPI.Models;

namespace CricketTournamentAPI.Controllers
{
    [Route("api/[controller]")] // API base route: /api/tournaments
    [ApiController] // Marks this as an API controller
    public class TournamentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        // Constructor to inject ApplicationDbContext
        public TournamentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/tournaments
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tournament>>> GetTournaments()
        {
            return await _context.Tournaments.ToListAsync();
        }

        // GET: api/tournaments/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Tournament>> GetTournament(int id)
        {
            var tournament = await _context.Tournaments.FindAsync(id);

            if (tournament == null)
            {
                return NotFound(); // Returns 404 if not found
            }

            return tournament;
        }

        // POST: api/tournaments
        [HttpPost]
        public async Task<ActionResult<Tournament>> CreateTournament(Tournament tournament)
        {
            _context.Tournaments.Add(tournament);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTournament), new { id = tournament.Id }, tournament);
        }

        // PUT: api/tournaments/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTournament(int id, Tournament tournament)
        {
            if (id != tournament.Id)
            {
                return BadRequest(); // Return 400 if ID mismatch
            }

            _context.Entry(tournament).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Tournaments.Any(e => e.Id == id))
                {
                    return NotFound(); // Return 404 if tournament doesn't exist
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Return 204 No Content on success
        }

        // DELETE: api/tournaments/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTournament(int id)
        {
            var tournament = await _context.Tournaments.FindAsync(id);
            if (tournament == null)
            {
                return NotFound();
            }

            _context.Tournaments.Remove(tournament);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
