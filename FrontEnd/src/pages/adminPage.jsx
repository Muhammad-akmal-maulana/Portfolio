import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CreateProject from '../components/adminPage/createProject';
import EditProject from '../components/adminPage/editProject';
import ProjectAdmin from '../components/adminPage/projectAdmin';

function AdminPage() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);

    async function fetchProjects() {
        try {
            const res = await fetch("http://localhost:5000/api/project");
            const data = await res.json();
            setProjects(data);
        } catch (err) {
            console.error("Gagal mengambil data:", err);
        }
    }

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    function handleEdit(project) {
        setEditingProject(project);
    }

    function handleCancelEdit() {
        setEditingProject(null);
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <section className='section'>
            {editingProject ? (
                <EditProject
                    project={editingProject}
                    onCancel={handleCancelEdit}
                    onUpdated={fetchProjects}
                />
            ) : (
                <CreateProject onCreated={fetchProjects} />
            )}

            <div className='project-list'>
                {projects.map((project) => (
                    <ProjectAdmin
                        key={project._id}
                        project={project}
                        onEdit={handleEdit}
                        onDeleted={fetchProjects}
                    />
                ))}
            </div>

            <button onClick={handleLogout}>Logout</button>
        </section>
    );
}

export default AdminPage;