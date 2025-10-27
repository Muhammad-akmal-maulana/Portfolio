import React, { useState } from 'react';
import LogoutPop from '../fitur/logout';
import '../style/navbar.css'

function NavAdmin({ setActivePage }) {
    const [showLogout, setShowLogout] = useState(false); // dropdown

    function handleLogout() {
        localStorage.removeItem('token');
        setShowLogout(false);
        window.location.href = 'http://localhost:5173/';
    }

    return (
        <nav className='navbar-android'>
            <h2>Admin Page.</h2>

            <div className="link-container">
                <button onClick={() => setActivePage('aboutme')}>About Me</button>
                <button onClick={() => setActivePage('project')}>Project</button>
                <button onClick={() => setActivePage('skill')}>Skill</button>
            </div>


            <button
                type="button"
                onClick={() => setShowLogout(s => !s)}
                className='red-button logout'
            >
                Log Out
            </button>

            {showLogout && (
                <LogoutPop show={showLogout} onClose={() => setShowLogout(false)} onConfirm={handleLogout} />
            )}

        </nav>
    );
}

export default NavAdmin;