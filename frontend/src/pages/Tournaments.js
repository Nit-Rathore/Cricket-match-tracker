import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Tournaments() {
    const navigate = useNavigate();
    
    // Sample tournaments (to be replaced with backend data later)
    const [tournaments, setTournaments] = useState([
        { id: 1, name: "Champions Trophy" },
        { id: 2, name: "Indian Premier League" },
    ]);

    return (
        <div style={styles.container}>
            <h1>Tournaments</h1>

            {tournaments.length === 0 ? (
                <p>No tournaments available. Create one!</p>
            ) : (
                <ul style={styles.list}>
                    {tournaments.map((tournament) => (
                        <li 
                            key={tournament.id} 
                            onClick={() => navigate(`/tournament/${tournament.id}`)} 
                            style={styles.listItem}
                        >
                            {tournament.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
    },
    list: {
        listStyleType: "none",
        padding: 0,
    },
    listItem: {
        padding: "10px",
        margin: "10px",
        backgroundColor: "#007bff",
        color: "white",
        cursor: "pointer",
        borderRadius: "5px",
    },
};

export default Tournaments;
