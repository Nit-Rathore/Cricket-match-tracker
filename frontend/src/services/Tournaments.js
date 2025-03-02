import React, { useEffect, useState } from "react";
import { getTournaments, createTournament } from "./pages";

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const [newTournament, setNewTournament] = useState({
    name: "",
    location: "",
    startDate: "",
    endDate: "",
    teamCount: 0,
  });

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const data = await getTournaments();
      setTournaments(data);
    } catch (error) {
      console.error("Failed to fetch tournaments");
    }
  };

  const handleChange = (e) => {
    setNewTournament({ ...newTournament, [e.target.name]: e.target.value });
  };

  const handleCreateTournament = async (e) => {
    e.preventDefault();
    try {
      await createTournament(newTournament);
      fetchTournaments(); // Refresh the list after adding
      setNewTournament({ name: "", location: "", startDate: "", endDate: "", teamCount: 0 });
    } catch (error) {
      console.error("Failed to create tournament");
    }
  };

  return (
    <div>
      <h1>Tournaments</h1>

      {/* Tournament List */}
      <ul>
        {tournaments.map((tournament) => (
          <li key={tournament.id}>
            <strong>{tournament.name}</strong> - {tournament.location} (Teams: {tournament.teamCount})
          </li>
        ))}
      </ul>

      {/* Create Tournament Form */}
      <h2>Create Tournament</h2>
      <form onSubmit={handleCreateTournament}>
        <input type="text" name="name" placeholder="Name" value={newTournament.name} onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" value={newTournament.location} onChange={handleChange} required />
        <input type="date" name="startDate" value={newTournament.startDate} onChange={handleChange} required />
        <input type="date" name="endDate" value={newTournament.endDate} onChange={handleChange} required />
        <input type="number" name="teamCount" placeholder="Team Count" value={newTournament.teamCount} onChange={handleChange} required />
        <button type="submit">Create Tournament</button>
      </form>
    </div>
  );
};

export default Tournaments;
