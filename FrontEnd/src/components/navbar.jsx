import React from 'react';
import './style/navbar.css';

function Navbar() {
    return (
        <>
            <nav className='navbar-android'>
                <a href="#hero-section">
                    <h2>Portfolio.</h2>
                </a>
                <div className="link-container">
                    <a href="">About Me</a>
                    <a href="">Skill</a>
                    <a href="">Project</a>
                    <a href="">Contact</a>
                </div>
                <i class="bi bi-list"></i>
            </nav>

            <nav className="navbar-dekstop"></nav>
        </>
    );
}

export default Navbar;