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
            <h1 style={styles.heading}>Manage Teams for Tournament {id}</h1>

            <div style={styles.teamListContainer}>
                <h2 style={styles.subHeading}>Current Teams</h2>
                <ul style={styles.teamList}>
                    {teams.map((team, index) => (
                        <li key={index} style={styles.teamItem}>{team}</li>
                    ))}
                </ul>
            </div>

            <div style={styles.addTeamContainer}>
                <h2 style={styles.subHeading}>Add a New Team</h2>
                <div style={styles.inputContainer}>
                    <input
                        type="text"
                        value={newTeam}
                        onChange={(e) => setNewTeam(e.target.value)}
                        placeholder="Enter team name"
                        style={styles.input}
                    />
                    <button onClick={addTeam} style={styles.button}>Add Team</button>
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "20px",
    },
    heading: {
        fontSize: "24px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    teamListContainer: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        width: "400px",
        textAlign: "center",
        marginBottom: "20px",
    },
    subHeading: {
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    teamList: {
        listStyle: "none",
        padding: 0,
    },
    teamItem: {
        backgroundColor: "#e0e0e0",
        padding: "10px",
        margin: "5px 0",
        borderRadius: "5px",
    },
    addTeamContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        width: "400px",
    },
    inputContainer: {
        display: "flex",
        gap: "10px",
        width: "100%",
        marginTop: "10px",
    },
    input: {
        flex: 1,
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    button: {
        padding: "10px 15px",
        backgroundColor: "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        transition: "background-color 0.3s",
    },
};

export default TeamManagement;
