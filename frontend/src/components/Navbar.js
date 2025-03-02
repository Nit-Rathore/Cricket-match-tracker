import React, {useState} from "react";
import { NavLink } from "react-router-dom";

function Navbar() {

    const [hoveredLink, setHoveredLink] = useState("");

    const handleMouseEnter = (link) => {setHoveredLink(link);
        
    };

    const handleMouseLeave = (link) => {setHoveredLink(null);

    };

    return (
        <nav style={styles.navbar}>
            <h2>Cricket Match Tracker</h2>
            <div>
                <NavLink to="/" style={{...styles.link, ...(hoveredLink==="/"? styles.linkHover: {})
            }} activeStyle={styles.active}
            onMouseEnter={() => handleMouseEnter("/")}
            onMouseLeave={handleMouseLeave}> Home</NavLink>
                <NavLink to="/tournaments" style={{...styles.link, ...(hoveredLink==="/tournaments"? styles.linkHover: {})
            }} activeStyle={styles.active}
            onMouseEnter={() => handleMouseEnter("/tournaments")}
            onMouseLeave={handleMouseLeave}> Tournaments </NavLink>
                <NavLink to="/create-tournament" style={{...styles.link, ...(hoveredLink ==="/create-tournament"? styles.linkHover:{})}} activeStyle={styles.active}
                onMouseEnter={() => handleMouseEnter("/create-tournament")}
                onMouseLeave={handleMouseLeave}>Create Tournament</NavLink>
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
        flexGrow: 1,
        color: "white",
        textDecoration: "none",
        marginLeft: "15px",
        fontSize: "18px"
    },
    linkHover: {
        color: "lightblue" // Change color on hover
    },
    active: {
        fontWeight: "bold",
        textDecoration: "underline"
    }
};

export default Navbar;
