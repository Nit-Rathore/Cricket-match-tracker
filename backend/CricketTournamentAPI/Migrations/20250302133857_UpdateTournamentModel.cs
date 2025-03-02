using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CricketTournamentAPI.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTournamentModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Tournaments",
                type: "TEXT",
                maxLength: 50,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "TeamCount",
                table: "Tournaments",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Tournaments");

            migrationBuilder.DropColumn(
                name: "TeamCount",
                table: "Tournaments");
        }
    }
}
