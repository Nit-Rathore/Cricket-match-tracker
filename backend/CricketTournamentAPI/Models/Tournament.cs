using System.ComponentModel.DataAnnotations;

namespace CricketTournamentAPI.Models;

public class Tournament
{
    public int Id { get; set; } // Primary Key

    [Required(ErrorMessage = "Tournament name is required.")]
    [StringLength(100, MinimumLength = 3, ErrorMessage = "Name must be between 3 and 100 characters.")]
    public string Name { get; set; } = string.Empty;

    [Required(ErrorMessage = "Location is required.")]
    [StringLength(50, ErrorMessage = "Location cannot exceed 50 characters.")]
    public string Location { get; set; } = string.Empty;

    [Required(ErrorMessage = "Start date is required.")]
    public DateTime StartDate { get; set; }

    [Required(ErrorMessage = "End date is required.")]
    [DateGreaterThan(nameof(StartDate), ErrorMessage = "End date must be later than the start date.")]
    public DateTime EndDate { get; set; }

    [Range(2, 32, ErrorMessage = "Team count must be between 2 and 32.")]
    public int TeamCount { get; set; }
}
