import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CreateTournament from "./pages/CreateTournament";
import TournamentDetails from "./pages/TournamentDetails";
import TeamManagement from "./pages/TeamManagement";
import MatchSchedule from "./pages/MatchSchedule";
import Tournaments from "./pages/Tournaments";
import NotFound from "./pages/NotFound"; // New 404 Page

function App() {
    return (
        <Router>
            <Navbar />
            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/create-tournament" element={<CreateTournament />} />
                    <Route path="/tournaments" element={<Tournaments />} />
                    <Route path="/tournament/:id" element={<TournamentDetails />} />
                    <Route path="/tournament/:id/teams" element={<TeamManagement />} />
                    <Route path="/tournament/:id/matches" element={<MatchSchedule />} />
                    <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
                </Routes>
            </main>
        </Router>
    );
}

export default App;
