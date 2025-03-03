using CricketTournamentAPI.Models;

namespace CricketTournamentAPI.Services
{
    public interface ITournamentService
    {
        Task<IEnumerable<Tournament>> GetAllTournaments();
        Task<Tournament?> GetTournamentById(int id);
        Task<Tournament> CreateTournament(Tournament tournament);
        Task<Tournament?> UpdateTournament(int id, Tournament tournament);
        Task<bool> DeleteTournament(int id);
    }
}
