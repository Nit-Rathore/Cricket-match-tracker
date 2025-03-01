import React from "react";
import { useParams, useNavigate } from "react-router-dom";

function TournamentDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div style={styles.container}>
            <h1>Tournament {id} Details</h1>

            <div style={styles.buttonContainer}>
                <button onClick={() => navigate(`/tournament/${id}/teams`)} style={styles.button}>
                    Manage Teams
                </button>
                <button onClick={() => navigate(`/tournament/${id}/matches`)} style={styles.button}>
                    Schedule Matches
                </button>
                <button onClick={() => navigate(`/tournament/${id}/results`)} style={styles.button}>
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

export default TournamentDetails;
