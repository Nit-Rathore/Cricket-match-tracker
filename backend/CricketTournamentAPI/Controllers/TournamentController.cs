using CricketTournamentAPI.Models;
using CricketTournamentAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace CricketTournamentAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TournamentController : ControllerBase
    {
        private readonly ITournamentService _service;

        public TournamentController(ITournamentService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> GetTournaments()
        {
            return Ok(await _service.GetAllTournaments());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTournamentById(int id)
        {
            var tournament = await _service.GetTournamentById(id);
            if (tournament == null) return NotFound();
            return Ok(tournament);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTournament([FromBody] Tournament tournament)
        {
            var createdTournament = await _service.CreateTournament(tournament);
            return CreatedAtAction(nameof(GetTournamentById), new { id = createdTournament.Id }, createdTournament);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTournament(int id, [FromBody] Tournament tournament)
        {
            var updatedTournament = await _service.UpdateTournament(id, tournament);
            if (updatedTournament == null) return NotFound();
            return Ok(updatedTournament);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTournament(int id)
        {
            if (!await _service.DeleteTournament(id)) return NotFound();
            return NoContent();
        }
    }
}
