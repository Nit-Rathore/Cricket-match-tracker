using CricketTournamentAPI.Models;
using CricketTournamentAPI.Repository;

namespace CricketTournamentAPI.Services
{
    public class TournamentService : ITournamentService
    {
        private readonly ITournamentRepository _repository;

        public TournamentService(ITournamentRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<Tournament>> GetAllTournaments() => _repository.GetAllTournaments();
        public Task<Tournament?> GetTournamentById(int id) => _repository.GetTournamentById(id);
        public Task<Tournament> CreateTournament(Tournament tournament) => _repository.CreateTournament(tournament);
        public Task<Tournament?> UpdateTournament(int id, Tournament tournament) => _repository.UpdateTournament(id, tournament);
        public Task<bool> DeleteTournament(int id) => _repository.DeleteTournament(id);
    }
}
