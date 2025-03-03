using System;
using System.Collections.Generic;
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
            new Tournament { Id = 1, Name = "Cricket Cup", Location = "New York", StartDate = DateTime.Today, EndDate = DateTime.Today.AddDays(5), TeamCount = 10 },
            new Tournament { Id = 2, Name = "Super League", Location = "London", StartDate = DateTime.Today, EndDate = DateTime.Today.AddDays(10), TeamCount = 8 }
        };

        _mockRepo.Setup(repo => repo.GetAllTournaments()).ReturnsAsync(tournaments);

        // Act
        var result = await _service.GetAllTournaments();

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count);
        Assert.Equal("Cricket Cup", result[0].Name);
    }

    [Fact]
    public async Task GetTournamentById_ShouldReturnTournament_WhenExists()
    {
        // Arrange
        var tournament = new Tournament 
        { 
            Id = 1, 
            Name = "Cricket Cup", 
            Location = "New York", 
            StartDate = DateTime.Today, 
            EndDate = DateTime.Today.AddDays(5), 
            TeamCount = 10 
        };

        _mockRepo.Setup(repo => repo.GetTournamentById(1)).ReturnsAsync(tournament);

        // Act
        var result = await _service.GetTournamentById(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Cricket Cup", result?.Name);
        Assert.True(result?.EndDate > result?.StartDate); // Validating EndDate
    }

    [Fact]
    public async Task CreateTournament_ShouldCallRepositoryOnce_WithValidData()
    {
        // Arrange
        var tournament = new Tournament
        {
            Id = 3,
            Name = "Champions Trophy",
            Location = "Australia",
            StartDate = DateTime.Today,
            EndDate = DateTime.Today.AddDays(7), // EndDate is valid
            TeamCount = 12
        };

        _mockRepo.Setup(repo => repo.CreateTournament(It.IsAny<Tournament>())).Returns(Task.CompletedTask);

        // Act
        await _service.CreateTournament(tournament);

        // Assert
        _mockRepo.Verify(repo => repo.CreateTournament(It.IsAny<Tournament>()), Times.Once);
    }

    [Fact]
    public async Task CreateTournament_ShouldFail_WhenEndDateIsBeforeStartDate()
    {
        // Arrange
        var tournament = new Tournament
        {
            Id = 4,
            Name = "Invalid Tournament",
            Location = "Invalid City",
            StartDate = DateTime.Today.AddDays(5), 
            EndDate = DateTime.Today, // Invalid: EndDate is before StartDate
            TeamCount = 10
        };

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(async () => await _service.CreateTournament(tournament));
    }

    [Fact]
    public async Task CreateTournament_ShouldFail_WhenTeamCountIsOutOfRange()
    {
        // Arrange
        var tournament = new Tournament
        {
            Id = 5,
            Name = "Bad Tournament",
            Location = "Somewhere",
            StartDate = DateTime.Today,
            EndDate = DateTime.Today.AddDays(3),
            TeamCount = 40 // Invalid: More than 32 teams
        };

        // Act & Assert
        await Assert.ThrowsAsync<ArgumentException>(async () => await _service.CreateTournament(tournament));
    }

    [Fact]
    public async Task DeleteTournament_ShouldReturnTrue_WhenTournamentExists()
    {
        _mockRepo.Setup(repo => repo.DeleteTournament(1)).ReturnsAsync(true);

        var result = await _service.DeleteTournament(1);

        Assert.True(result);
        _mockRepo.Verify(repo => repo.DeleteTournament(1), Times.Once);
    }

    [Fact]
    public async Task DeleteTournament_ShouldReturnFalse_WhenTournamentDoesNotExist()
    {
        _mockRepo.Setup(repo => repo.DeleteTournament(It.IsAny<int>())).ReturnsAsync(false);

        var result = await _service.DeleteTournament(99);

        Assert.False(result);
        _mockRepo.Verify(repo => repo.DeleteTournament(99), Times.Once);
    }
}
