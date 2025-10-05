import React, { useState } from "react";

function Dropdown({ 
    label, 
    children, 
    icon = <i className="bi bi-chevron-right trigger-icon"></i>, 
    className = "" ,
    contentClassName = ""
}) {

    const [open, setOpen] = useState(false);

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