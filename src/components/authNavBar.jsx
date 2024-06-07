import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authcontext } from "./context";
import "./css/authNav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShirt } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";


const AuthNav = () => {
    const { logout } = useContext(authcontext);
    const [isOpen, setIsOpen] = useState(false);
    const {admin} = useContext(authcontext);
    const [dropDown, setDropDown] = useState(false);
    const handleClick = () => {
        logout();
    }
    const handleDropDown = () => {
        setDropDown(!dropDown);
    }
    const handleModal = () => {
        setIsOpen(!isOpen);
    }
    return (
        <div >
            <nav className="auth-nav">
            <div className="logo">
                    <FontAwesomeIcon icon={faShirt} size="1x" className="shirt" color="none" />
                    <p className="logos">Ohi Clothing</p>
                </div>
                <div className="icons">
                    <Link className="links" to={'/items'}>Home</Link>
                    <Link className="links" to={'/store'}>Shop</Link>
                    <Link className="links" to={'/'} onClick={handleClick}>Logout</Link>
                    <FontAwesomeIcon icon={faBars} size="1x" color="white" className="abars" onClick={handleDropDown} />
                    {(
                        dropDown && <div className="scaff" onClick={handleDropDown}>
                        <div className="nav-dropDown">
                            <div>
                                <FontAwesomeIcon icon={faTimes} size="1x" color="none" onClick={handleDropDown} />
                            </div>
                            <Link to="/items" className="D-link">Home</Link>
                            <Link to="/store" className="D-link">Shop</Link>
                            <Link to="/" className="D-link" onClick={handleClick}>Logout</Link>
                            {admin && <Link to={'/addItem'} className="Adropdown-link">Add Item</Link> }
                           {admin && <Link className="Adropdown-link"  to={'/soldItems'}>Sold Items</Link>} 
                            {admin && <Link className="Adropdown-link"to={'/users'} >View Users</Link>}
                            {admin &&  <Link className="Adropdown-link"to={'/editItems'} >Edit Details</Link>} <Link className="dropdown-link"to={'/editItems'} >Edit Details</Link>
                        </div>
                    </div>
                        
                    )}
                   {admin && <FontAwesomeIcon icon={faCircle} size="2x" color="white" className="circle" onClick={handleModal}/>}
                    <div className={isOpen ? 'dropdown' : 'none'} onClick={handleModal}>
                        Admin menu
                        <hr />
                        <div className="link-container">  
                        <FontAwesomeIcon icon={faPlus} size="1x" color="none" />  
                        <Link to={'/addItem'} className="dropdown-link">Add Item</Link>
                        <FontAwesomeIcon icon={faFolderOpen} size="1x" color="none" />
                        <Link className="dropdown-link"  to={'/soldItems'}>Sold Items</Link>
                        <FontAwesomeIcon icon={faEdit} size="1x" color="none" />
                        <Link className="dropdown-link"to={'/editItems'} >Edit Details</Link>
                        <FontAwesomeIcon icon={faUser} size="1x" color="none" />
                        <Link className="dropdown-link"to={'/users'} >View Users</Link>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    );
};

export default AuthNav;
