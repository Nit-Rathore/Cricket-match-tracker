import React, { useState } from "react";
import { useParams } from "react-router-dom";

function TeamManagement() {
    const { id } = useParams(); // Get tournament ID from URL
    const [teams, setTeams] = useState(["Team A", "Team B", "Team C"]);
    const [newTeam, setNewTeam] = useState("");

    // Function to add a new team
    const addTeam = () => {
        if (newTeam.trim() !== "") {
            setTeams([...teams, newTeam.trim()]);
            setNewTeam("");
        }
    };

    return (
        <div style={styles.container}>
            <h1>Manage Teams for Tournament {id}</h1>

            <h2>Current Teams</h2>
            <ul>
                {teams.map((team, index) => (
                    <li key={index}>{team}</li>
                ))}
            </ul>

            <h2>Add a New Team</h2>
            <input
                type="text"
                value={newTeam}
                onChange={(e) => setNewTeam(e.target.value)}
                placeholder="Enter team name"
                style={styles.input}
            />
            <button onClick={addTeam} style={styles.button}>Add Team</button>
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

export default TeamManagement;
