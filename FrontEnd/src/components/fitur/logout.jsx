import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import '../style/popup.css'

function LogoutPop({ show, onClose, onConfirm }) {
    const modalRef = useRef(null);

    useEffect(() => {
        if (!show) return;

        const handleKey = (e) => {
            if (e.key === 'Escape') onClose();
        };

        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKey);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKey);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show, onClose]);

    if (!show) return null;

    return createPortal(
        <div className='popup-container flex justify-center align-item-center' aria-modal="true" role="dialog">
            <div className="blur-bg white-bg"></div>

            <div className='sub-popup-container box-shadow' ref={modalRef}>
                <div className="blue-button header">
                    <div className="flex justify-beetween align-item-center">
                        <p>Log Out</p>
                        <button
                            type="button"
                            onClick={onClose}
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
                            onClick={onClose}
                            className='stay'
                        >Cancel</button>

                        <button
                            onClick={onConfirm}
                            className='red-button red-onet'
                        >Pretty Sure</button>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

export default LogoutPop;