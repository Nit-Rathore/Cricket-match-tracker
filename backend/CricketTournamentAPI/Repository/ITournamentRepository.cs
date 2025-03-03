using CricketTournamentAPI.Models;

namespace CricketTournamentAPI.Repository
{
    public interface ITournamentRepository
    {
        Task<IEnumerable<Tournament>> GetAllTournaments();
        Task<Tournament?> GetTournamentById(int id);
        Task<Tournament> CreateTournament(Tournament tournament);
        Task<Tournament?> UpdateTournament(int id, Tournament tournament);
        Task<bool> DeleteTournament(int id);
    }
}
