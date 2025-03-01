import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateTournament() {
    const [tournamentName, setTournamentName] = useState("");
    const [startDate, setStartDate] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!tournamentName || !startDate) {
            alert("Please fill in all fields.");
            return;
        }

        console.log("Tournament Created:", { tournamentName, startDate });

        navigate("/");
    };

    return (
        <div style={styles.container}>
            <h1>Create a New Tournament</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Tournament Name:</label>
                <input
                    type="text"
                    value={tournamentName}
                    onChange={(e) => setTournamentName(e.target.value)}
                    style={styles.input}
                    placeholder="Enter tournament name"
                    required
                />

                <label style={styles.label}>Start Date:</label>
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    style={styles.input}
                    required
                />

                <button type="submit" style={styles.button}>Create Tournament</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        maxWidth: "400px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        background: "#f9f9f9"
    },
    label: {
        fontSize: "16px",
        marginBottom: "5px",
        textAlign: "left"
    },
    input: {
        padding: "8px",
        fontSize: "14px",
        marginBottom: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc"
    },
    button: {
        background: "#28a745",
        color: "white",
        padding: "10px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        fontSize: "16px"
    }
};

export default CreateTournament;
