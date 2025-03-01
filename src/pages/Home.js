import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1>Welcome to the Cricket Tournament Manager</h1>
            <p>Select an option below:</p>

            <div style={styles.buttonContainer}>
                <button onClick={() => navigate("/tournaments")} style={styles.button}>
                    View Tournaments
                </button>
                <button onClick={() => navigate("/teams")} style={styles.button}>
                    Manage Teams
                </button>
                <button onClick={() => navigate("/matches")} style={styles.button}>
                    Schedule Matches
                </button>
                <button onClick={() => navigate("/results")} style={styles.button}>
                    View Results
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
    },
    buttonContainer: {
        marginTop: "20px",
    },
    button: {
        margin: "10px",
        padding: "10px 20px",
        fontSize: "16px",
        cursor: "pointer",
        border: "none",
        borderRadius: "5px",
        backgroundColor: "#007bff",
        color: "white",
    },
};

export default Home;
