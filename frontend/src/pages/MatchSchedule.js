import React, { useState } from "react";
import { useParams } from "react-router-dom";

function MatchSchedule() {
    const { id } = useParams(); // Get tournament ID from URL
    const [matches, setMatches] = useState([
        { team1: "Team A", team2: "Team B", date: "2024-03-01" },
        { team1: "Team C", team2: "Team D", date: "2024-03-02" },
    ]);
    const [newMatch, setNewMatch] = useState({ team1: "", team2: "", date: "" });

    // Function to add a new match
    const addMatch = () => {
        if (newMatch.team1 && newMatch.team2 && newMatch.date) {
            setMatches([...matches, newMatch]);
            setNewMatch({ team1: "", team2: "", date: "" });
        }
    };

    return (
        <div style={styles.container}>
            <h1>Match Schedule for Tournament {id}</h1>

            <h2>Scheduled Matches</h2>
            <ul>
                {matches.map((match, index) => (
                    <li key={index}>
                        {match.team1} vs {match.team2} - {match.date}
                    </li>
                ))}
            </ul>

            <h2>Schedule a New Match</h2>
            <input
                type="text"
                placeholder="Team 1"
                value={newMatch.team1}
                onChange={(e) => setNewMatch({ ...newMatch, team1: e.target.value })}
                style={styles.input}
            />
            <input
                type="text"
                placeholder="Team 2"
                value={newMatch.team2}
                onChange={(e) => setNewMatch({ ...newMatch, team2: e.target.value })}
                style={styles.input}
            />
            <input
                type="date"
                value={newMatch.date}
                onChange={(e) => setNewMatch({ ...newMatch, date: e.target.value })}
                style={styles.input}
            />
            <button onClick={addMatch} style={styles.button}>Add Match</button>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
    },
    input: {
        padding: "10px",
        marginRight: "10px",
    },
    button: {
        padding: "10px",
        backgroundColor: "blue",
        color: "white",
        border: "none",
        cursor: "pointer",
    },
};

export default MatchSchedule;
