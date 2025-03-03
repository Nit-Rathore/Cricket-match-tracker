using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using Xunit;
using CricketTournamentAPI.Models;
using CricketTournamentAPI.Repository;
using CricketTournamentAPI.Services;

public class TournamentServiceTests
{
    private readonly Mock<ITournamentRepository> _mockRepo;
    private readonly TournamentService _service;

    public TournamentServiceTests()
    {
        _mockRepo = new Mock<ITournamentRepository>();
        _service = new TournamentService(_mockRepo.Object);
    }

    [Fact]
    public async Task GetAllTournaments_ShouldReturnListOfTournaments()
    {
        // Arrange
        var tournaments = new List<Tournament>
        {
            new Tournament { Id = 1, Name = "Cricket Cup", Location = "New York", TeamCount = 10 },
            new Tournament { Id = 2, Name = "Super League", Location = "London", TeamCount = 8 }
        };
        
        _mockRepo.Setup(repo => repo.GetAllTournaments()).ReturnsAsync(tournaments);

        // Act
        var result = (await _service.GetAllTournaments()).ToList(); // Fix: Convert to List

        // Assert
        Assert.Equal(2, result.Count);
        Assert.Equal("Cricket Cup", result[0].Name);
    }

    [Fact]
    public async Task GetTournamentById_ShouldReturnTournament_WhenExists()
    {
        // Arrange
        var tournaments = new List<Tournament>
        {
            new Tournament { Id = 1, Name = "Cricket Cup", Location = "New York", TeamCount = 10 }
        };

        _mockRepo.Setup(repo => repo.GetTournamentById(It.IsAny<int>()))
                 .ReturnsAsync((int id) => tournaments.FirstOrDefault(t => t.Id == id));

        // Act
        var result = await _service.GetTournamentById(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Cricket Cup", result.Name);
    }

    [Fact]
    public async Task GetTournamentById_ShouldReturnNull_WhenNotExists()
    {
        // Arrange
        _mockRepo.Setup(repo => repo.GetTournamentById(It.IsAny<int>())).ReturnsAsync((Tournament)null);

        // Act
        var result = await _service.GetTournamentById(99);

        // Assert
        Assert.Null(result);
    }

    [Fact]
    public async Task CreateTournament_ShouldCallRepositoryOnce()
    {
        // Arrange
        var tournament = new Tournament { Id = 3, Name = "Champions Trophy", Location = "Australia", TeamCount = 12 };

        _mockRepo.Setup(repo => repo.CreateTournament(It.IsAny<Tournament>()))
                .ReturnsAsync((Tournament t) => t); // Fix here

        // Act
        var result = await _service.CreateTournament(tournament);

        // Assert
        Assert.NotNull(result); // Ensure it returns a tournament
        Assert.Equal("Champions Trophy", result.Name);
        _mockRepo.Verify(repo => repo.CreateTournament(It.IsAny<Tournament>()), Times.Once);
    }


    [Fact]
    public async Task DeleteTournament_ShouldReturnTrue_WhenTournamentExists()
    {
        // Arrange
        _mockRepo.Setup(repo => repo.DeleteTournament(It.IsAny<int>())).ReturnsAsync(true);

        // Act
        var result = await _service.DeleteTournament(1);

        // Assert
        Assert.True(result);
        _mockRepo.Verify(repo => repo.DeleteTournament(It.IsAny<int>()), Times.Once);
    }

    [Fact]
    public async Task DeleteTournament_ShouldReturnFalse_WhenTournamentDoesNotExist()
    {
        // Arrange
        _mockRepo.Setup(repo => repo.DeleteTournament(It.IsAny<int>())).ReturnsAsync(false);

        // Act
        var result = await _service.DeleteTournament(99);

        // Assert
        Assert.False(result);
        _mockRepo.Verify(repo => repo.DeleteTournament(It.IsAny<int>()), Times.Once);
    }
}
