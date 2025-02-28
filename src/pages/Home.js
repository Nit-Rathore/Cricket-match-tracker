import React from "react";
import { Link } from "react-router-dom";

function Home() {
    // Temporary list of tournaments (before backend integration)
    const tournaments = [
        { id: 1, name: "World Cup 2024", date: "June 15, 2024" },
        { id: 2, name: "IPL 2024", date: "March 31, 2024" }
    ];

    return (
        <div style={styles.container}>
            <h1>🏏 Cricket Tournaments</h1>
            <Link to="/create-tournament" style={styles.button}>➕ Create Tournament</Link>

            <div style={styles.tournamentList}>
                {tournaments.map((tournament) => (
                    <div key={tournament.id} style={styles.card}>
                        <h3>{tournament.name}</h3>
                        <p>📅 {tournament.date}</p>
                        <Link to={`/tournament/${tournament.id}`} style={styles.detailsButton}>View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
    },
    button: {
        display: "inline-block",
        background: "#007BFF",
        color: "white",
        padding: "10px 15px",
        textDecoration: "none",
        borderRadius: "5px",
        marginBottom: "20px",
        fontSize: "16px"
    },
    tournamentList: {
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "20px"
    },
    card: {
        background: "#f8f9fa",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        width: "250px",
        textAlign: "center"
    },
    detailsButton: {
        display: "block",
        marginTop: "10px",
        textDecoration: "none",
        color: "blue",
        fontWeight: "bold"
    }
};

export default Home;
