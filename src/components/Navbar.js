import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav style={styles.navbar}>
            <h2>Cricket Match Tracker</h2>
            <div>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/create-tournament" style={styles.link}>Create Tournament</Link>
            </div>
        </nav>
    );
}

const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        background: "#282c34",
        color: "white"
    },
    link: {
        color: "white",
        textDecoration: "none",
        marginLeft: "15px",
        fontSize: "18px"
    }
};

export default Navbar;
