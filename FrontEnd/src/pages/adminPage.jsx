import React, { useState, useEffect, useRef } from 'react';
import ProjectTable from '../components/adminPages/projectTable';
import NavAdmin from '../components/adminPages/navAdmin';
import AboutmeEdit from '../components/adminPages/aboutmeEdit';

function AdminPage() {
    const [activePage, setActivePage] = useState('aboutme'); // halaman default
    const [showBottomBar, setShowBottomBar] = useState(true);

    return (
        <>
            {showBottomBar && <NavAdmin setActivePage={setActivePage} />}

            <div>
                {activePage === 'aboutme' && <AboutmeEdit />}
                {activePage === 'project' && (
                    <ProjectTable setShowBottomBar={setShowBottomBar} />
                )}
            </div>
        </>
    );
}

export default AdminPage;