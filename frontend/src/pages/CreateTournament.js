import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTournament } from "../services/api"; // Import API

function CreateTournament() {
    const [tournament, setTournament] = useState({
        name: "",
        location: "",
        startDate: "",
        endDate: "",
        teamCount: 2, // Default team count
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTournament({ 
            ...tournament, 
            [name]: name === "teamCount" ? parseInt(value, 10) : value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tournament.name || !tournament.location || !tournament.startDate || !tournament.endDate) {
            alert("Please fill in all fields.");
            return;
        }

        if (new Date(tournament.endDate) <= new Date(tournament.startDate)) {
            alert("End date must be later than start date.");
            return;
        }

        if (tournament.teamCount < 2 || tournament.teamCount > 32) {
            alert("Team count must be between 2 and 32.");
            return;
        }

        try {
            await createTournament(tournament); 
            alert("Tournament created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error creating tournament:", error);
            alert("Failed to create tournament.");
        }
    };

    return (
        <div style={styles.container}>
            <h1>Create a New Tournament</h1>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>Tournament Name:</label>
                <input
                    type="text"
                    name="name"
                    value={tournament.name}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Enter tournament name"
                    required
                />

                <label style={styles.label}>Location:</label>
                <input
                    type="text"
                    name="location"
                    value={tournament.location}
                    onChange={handleChange}
                    style={styles.input}
                    placeholder="Enter location"
                    required
                />

                <label style={styles.label}>Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={tournament.startDate}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />

                <label style={styles.label}>End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={tournament.endDate}
                    onChange={handleChange}
                    style={styles.input}
                    required
                />

                <label style={styles.label}>Team Count (2-32):</label>
                <input
                    type="number"
                    name="teamCount"
                    value={tournament.teamCount}
                    min="2"
                    max="32"
                    onChange={handleChange}
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
