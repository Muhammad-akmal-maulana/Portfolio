import React, { useState, useEffect, useRef } from 'react';
import './style/navbar.css';

function Navbar() {
    const [show, setShow] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div
            className='navbar'
            ref={dropdownRef}>
            <nav className='navbar-android'>
                <a href="#hero-section">
                    <h2>Portfolio.</h2>
                </a>
                <div className="link-container  non-burger">
                    <a href="#aboutme">About Me</a>
                    <a href="#skill-page">Skill</a>
                    <a href="#project-page">Project</a>
                </div>

                <div className="nav-right">
                    <a href="#footer-page" className='footer-buttom'>Contact</a>

                    {/* burger for android */}
                    <button onClick={() => setShow(!show)}>
                        <i className="bi bi-list burger"></i>
                    </button>
                </div>
            </nav>

            {show && (
                <div 
                    className={`
                        link-container 
                        burger 
                        burger-container 
                    `}
                >
                    <a href="#aboutme">About Me</a>
                    <a href="#skill-page">Skill</a>
                    <a href="#project-page">Project</a>
                    <a href="#footer-page">Contact</a>
                </div>
            )}

            <nav className="navbar-dekstop">

            </nav>
        </div>
    );
}

export default Navbar;