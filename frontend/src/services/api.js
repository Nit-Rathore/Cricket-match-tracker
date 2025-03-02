import axios from "axios";

const API_BASE_URL = "http://localhost:5277/api"; // Your .NET backend URL

export const getTournaments = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/tournament`);
        return response.data;
    } catch (error) {
        console.error("Error fetching tournaments:", error);
        throw error;
    }
};

export const createTournament = async (tournamentData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/tournament`, tournamentData);
        return response.data;
    } catch (error) {
        console.error("Error creating tournament:", error);
        throw error;
    }
};

// 🆕 Update Tournament API Call
export const updateTournament = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/tournament/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error updating tournament:", error);
        throw error;
    }
};

// 🆕 Delete Tournament API Call
export const deleteTournament = async (id) => {
    try {
        await axios.delete(`${API_BASE_URL}/tournament/${id}`);
    } catch (error) {
        console.error("Error deleting tournament:", error);
        throw error;
    }
};
