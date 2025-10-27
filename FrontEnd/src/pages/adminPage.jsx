import React, { useState, useEffect, useRef } from 'react';
import ProjectTable from '../components/adminPages/projectTable';
import NavAdmin from '../components/adminPages/navAdmin';
import AboutmeEdit from '../components/adminPages/aboutmeEdit';
import SkillEdit from '../components/adminPages/skillEdit';

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
                {activePage === 'skill' && <SkillEdit />}
            </div>
        </>
    );
}

export default AdminPage;