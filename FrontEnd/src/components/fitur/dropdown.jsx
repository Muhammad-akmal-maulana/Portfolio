import React, { useState, useEffect, useRef } from "react";

function Dropdown({ 
    label, 
    children, 
    icon = <i className="bi bi-chevron-right trigger-icon"></i>, 
    className = "" ,
    contentClassName = ""
}) {

    const [open, setOpen] = useState(false);
    const rootRef = useRef(null);

    useEffect(() => {
        const onDocClick = (e) => {
            if (!rootRef.current) return;
            if (!rootRef.current.contains(e.target)) setOpen(false);
        };
        document.addEventListener("click", onDocClick);
        return () => document.removeEventListener("click", onDocClick);
    }, []);

    const handleContentClick = (e) => {
        if (e.target.closest("button")) setOpen(false);
    };

    return (
        <div className={`dropdown fade-in ${className}`}>
            <div className="dropdown-trigger flex align-item-center">
                <button onClick={() => setOpen(!open)}>{label}</button>
                {icon}
            </div>
            <div className={`dropdown-content${open ? " show" : ""} ${contentClassName}`}>
                {children}
            </div>
        </div>
    );
}

export default Dropdown;