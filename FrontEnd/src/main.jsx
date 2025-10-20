import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RequireAuth from './auth/requireAuth';
import UserPage from './pages/userPage';
import AdminPage from './pages/adminPage';
import LoginPage from './pages/loginPage';
import ProjectsPage from './pages/projectPage';
import Project from './components/project';

import "bootstrap-icons/font/bootstrap-icons.css"; // icon bootstrap
import './global.css';

const token = localStorage.getItem("token");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/login' element={<LoginPage />} />

        <Route //proteksi halaman admin
          path='/admin'
          element={
            <RequireAuth>
              <AdminPage />
            </RequireAuth>
          }
        />

        <Route path="/projectPage" element={<ProjectsPage />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
