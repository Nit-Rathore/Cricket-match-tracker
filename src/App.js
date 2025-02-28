import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function Home() {
    return <h1>Home Page</h1>;
}

function CreateTournament() {
    return <h1>Create Tournament Page</h1>;
}

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-tournament" element={<CreateTournament />} />
            </Routes>
        </Router>
    );
}

export default App;

