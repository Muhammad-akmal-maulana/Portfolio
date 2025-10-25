import React, { useState, useEffect, useRef } from 'react';
import '../style/bottombar.css'

function BottomBar() {
    const [showLogout, setShowLogout] = useState(false); // dropdown
    const dropdownRef = useRef(null); // dropdown bakal ketutup kalau klik di luar dropdown content

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowLogout(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    function handleLogout() {
        localStorage.removeItem('token');
        setShowLogout(false);
        window.location.href = 'http://localhost:5173/';
    }

    return (
        <div className='bottombar'>
            <div className="flex align-item-center">
                <h2>Admin Page.</h2>
                <button>About Me</button>
                <button>Project</button>
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => setShowLogout(s => !s)}
                    className='red-button close'
                >
                    Log Out
                </button>

                {showLogout && (
                    <div className='popup-container flex justify-center align-item-center'>
                        <div className="blur-bg white-bg"></div>

                        <div
                            className='sub-popup-container box-shadow'
                            ref={dropdownRef}
                        >
                            <div className="blue-button header">
                                <div className="flex justify-beetween align-item-center">
                                    <p>Log Out</p>
                                    <button
                                        type="button"
                                        onClick={() => setShowLogout(false)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="30"
                                            fill="currentColor"
                                            className="bi bi-x"
                                            viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="sub-popup">
                                <div className="flex align-item-center justify-beetween middle-popup">
                                    <div className="gif"></div>

                                    <div className="popup-text">
                                        <h2>Wait... You're leaving?</h2>
                                        <p>Are You Sure?</p>
                                    </div>
                                </div>

                                <div className="flex justify-center align-item-center popbutton-container">
                                    <button
                                        onClick={() => setShowLogout(false)}
                                        className='stay'
                                    >Cancel</button>

                                    <button
                                        onClick={handleLogout}
                                        className='red-button red-onet'
                                    >Pretty Sure</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BottomBar;