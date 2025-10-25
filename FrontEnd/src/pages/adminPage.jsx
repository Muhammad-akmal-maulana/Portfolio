import React, { useState, useEffect, useRef } from 'react';
import ProjectTable from '../components/adminPages/projectTable';
import BottomBar from '../components/adminPages/bottombar';
import '../components/style/adminPage.css';

function AdminPage() {
    
    return (
        <>
            <BottomBar/>
            <ProjectTable/>
        </>
    );
}

export default AdminPage;