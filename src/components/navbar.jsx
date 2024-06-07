import { useState } from "react";
import { Link } from "react-router-dom";
import "./css/navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt, faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    const [barsNav, setBarsNav] = useState(false);

    const handleBarsNavToggle = () => {
        setBarsNav(prevState => !prevState);
    };

    return (
        <div>
            <nav className="nav">
                <div className="logo">
                    <FontAwesomeIcon icon={faShirt} size="1x" color="none" />
                    <p className="logo">Ohi Clothing</p>
                </div>
                <div className="Nlinks">
                    <Link to="/" className="link">Home</Link>
                    <Link to="/login" className="link">Login</Link>
                    <Link to="/signup" className="link">Signup</Link>
                    <FontAwesomeIcon icon={faBars} size="1x" className="bar" color="white" onClick={handleBarsNavToggle} />
                </div>
                {barsNav && (
                    <div className="scaff" onClick={handleBarsNavToggle}>
                        <div className="nav-dropDown">
                            <div>
                                <FontAwesomeIcon icon={faTimes} size="1x" color="none" onClick={handleBarsNavToggle} />
                            </div>
                            <Link to="/" className="D-link">Home</Link>
                            <Link to="/login" className="D-link">Login</Link>
                            <Link to="/signup" className="D-link">Signup</Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default NavBar;
