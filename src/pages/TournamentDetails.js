import React from "react";
import { useParams } from "react-router-dom";

function TournamentDetails() {
    const { id } = useParams();

    const tournament = {
        id: id,
        name: "Champions League",
        startDate: "2024-06-15",
        teams: ["Team A", "Team B", "Team C", "Team D"],
        matches: [
            { matchId: 1, team1: "Team A", team2: "Team B", date: "2024-06-20" },
            { matchId: 2, team1: "Team C", team2: "Team D", date: "2024-06-22" }
        ]
    };

    return (
        <div style={styles.container}>
            <h1>{tournament.name}</h1>
            <p><strong>Start Date:</strong> {tournament.startDate}</p>

            <h2>Teams</h2>
            <ul>
                {tournament.teams.map((team, index) => (
                    <li key={index}>{team}</li>
                ))}
            </ul>

            <h2>Match Schedule</h2>
            <ul>
                {tournament.matches.map((match) => (
                    <li key={match.matchId}>
                        {match.team1} vs {match.team2} - {match.date}
                    </li>
                ))}
            </ul>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
    },
};

export default TournamentDetails;
