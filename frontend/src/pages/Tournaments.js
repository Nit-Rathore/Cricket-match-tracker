import React, { useState, useEffect } from "react";
import { getTournaments, deleteTournament, updateTournament } from "../services/api";

function Tournaments() {
    const [tournaments, setTournaments] = useState([]);
    const [editingTournament, setEditingTournament] = useState(null);
    const [editFormData, setEditFormData] = useState({});

    useEffect(() => {
        fetchTournaments();
    }, []);

    const fetchTournaments = async () => {
        try {
            const data = await getTournaments();
            setTournaments(data);
        } catch (error) {
            console.error("Error fetching tournaments:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this tournament?")) {
            try {
                await deleteTournament(id);
                setTournaments(tournaments.filter(tournament => tournament.id !== id));
            } catch (error) {
                alert("Failed to delete tournament.");
            }
        }
    };

    const handleEditClick = (tournament) => {
        setEditingTournament(tournament.id);
        setEditFormData({ ...tournament });
    };

    const handleEditChange = (e) => {
        setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = async () => {
        try {
            await updateTournament(editingTournament, editFormData);
            setEditingTournament(null);
            fetchTournaments();
        } catch (error) {
            alert("Failed to update tournament.");
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Tournaments</h1>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Team Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tournaments.map((tournament) => (
                        <tr key={tournament.id}>
                            {editingTournament === tournament.id ? (
                                <>
                                    <td>{tournament.id}</td>
                                    <td>
                                        <input type="text" name="name" value={editFormData.name} onChange={handleEditChange} style={styles.input} />
                                    </td>
                                    <td>
                                        <input type="text" name="location" value={editFormData.location} onChange={handleEditChange} style={styles.input} />
                                    </td>
                                    <td>
                                        <input type="date" name="startDate" value={editFormData.startDate} onChange={handleEditChange} style={styles.input} />
                                    </td>
                                    <td>
                                        <input type="date" name="endDate" value={editFormData.endDate} onChange={handleEditChange} style={styles.input} />
                                    </td>
                                    <td>
                                        <input type="number" name="teamCount" value={editFormData.teamCount} min="2" max="32" onChange={handleEditChange} style={styles.input} />
                                    </td>
                                    <td>
                                        <button onClick={handleSaveEdit} style={styles.saveButton}>Save</button>
                                        <button onClick={() => setEditingTournament(null)} style={styles.cancelButton}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{tournament.id}</td>
                                    <td>{tournament.name}</td>
                                    <td>{tournament.location}</td>
                                    <td>{new Date(tournament.startDate).toLocaleDateString()}</td>
                                    <td>{new Date(tournament.endDate).toLocaleDateString()}</td>
                                    <td>{tournament.teamCount}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(tournament)} style={styles.editButton}>Edit</button>
                                        <button onClick={() => handleDelete(tournament.id)} style={styles.deleteButton}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    container: {
        textAlign: "center",
        padding: "20px",
    },
    heading: {
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "20px",
    },
    table: {
        width: "80%",
        margin: "auto",
        borderCollapse: "collapse",
        background: "#fff",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        borderRadius: "8px",
        overflow: "hidden",
    },
    input: {
        padding: "5px",
        fontSize: "14px",
        width: "90%",
        borderRadius: "4px",
        border: "1px solid #ddd",
    },
    th: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "12px",
        textAlign: "center",
        fontSize: "16px",
    },
    td: {
        padding: "10px",
        border: "1px solid #ddd",
        textAlign: "center",
    },
    editButton: {
        background: "#ffc107",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        margin: "5px",
        cursor: "pointer",
        borderRadius: "4px",
    },
    deleteButton: {
        background: "#dc3545",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        margin: "5px",
        cursor: "pointer",
        borderRadius: "4px",
    },
    saveButton: {
        background: "#28a745",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        margin: "5px",
        cursor: "pointer",
        borderRadius: "4px",
    },
    cancelButton: {
        background: "#6c757d",
        color: "#fff",
        border: "none",
        padding: "8px 12px",
        margin: "5px",
        cursor: "pointer",
        borderRadius: "4px",
    },
};

export default Tournaments;
