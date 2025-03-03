using CricketTournamentAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace CricketTournamentAPI.Repository
{
    public class TournamentRepository : ITournamentRepository
    {
        private readonly ApplicationDbContext _context;

        public TournamentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tournament>> GetAllTournaments()
        {
            return await _context.Tournaments.ToListAsync();
        }

        public async Task<Tournament?> GetTournamentById(int id)
        {
            return await _context.Tournaments.FindAsync(id);
        }

        public async Task<Tournament> CreateTournament(Tournament tournament)
        {
            _context.Tournaments.Add(tournament);
            await _context.SaveChangesAsync();
            return tournament;
        }

        public async Task<Tournament?> UpdateTournament(int id, Tournament tournament)
        {
            var existingTournament = await _context.Tournaments.FindAsync(id);
            if (existingTournament == null) return null;

            existingTournament.Name = tournament.Name;
            existingTournament.Location = tournament.Location;
            existingTournament.StartDate = tournament.StartDate;
            existingTournament.EndDate = tournament.EndDate;
            existingTournament.TeamCount = tournament.TeamCount;

            await _context.SaveChangesAsync();
            return existingTournament;
        }

        public async Task<bool> DeleteTournament(int id)
        {
            var tournament = await _context.Tournaments.FindAsync(id);
            if (tournament == null) return false;

            _context.Tournaments.Remove(tournament);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
