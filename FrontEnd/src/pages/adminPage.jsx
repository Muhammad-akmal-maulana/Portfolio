import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CreateProject from '../components/adminPage/createProject';
import EditProject from '../components/adminPage/editProject';
import '../components/style/adminPage.css';

function AdminPage() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [editingProject, setEditingProject] = useState(null);
    const [createMode, setCreateMode] = useState(false);

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

    function handleCreateClick() {
        setCreateMode(true);
        setEditingProject(null);
    }

    useEffect(() => {
        fetchProjects();
    }, []);

    return (
        <section className='section'>
            {/* button + new project muncul ketika tidak ada project yang sedang diedit / mode create */}
            <div className="flex justify-beetween">
                {!createMode && !editingProject && (
                    <button onClick={handleCreateClick}>+ New Project</button>
                )}

                <button onClick={handleLogout}>Logout</button>
            </div>

            {editingProject ? (
                <EditProject
                    project={editingProject}
                    onCancel={handleCancelEdit}
                    onUpdated={fetchProjects}
                />
            ) : createMode ? (
                <CreateProject
                    onCreated={() => { fetchProjects(); setCreateMode(false) }}
                    onCancel={() => setCreateMode(false)}
                />
            ) : (

                <table className='table-admin'>
                    <thead>
                        <th>Gambar Project</th>
                        <th>Judul</th>
                        <th>Deskripsi</th>
                        <th>Kategori</th>
                        <th>Update & Delete</th>
                    </thead>
                    <tbody>
                        {projects.map((project) => (
                            <tr>
                                <td>
                                    {project.image && (
                                        <img
                                            src={`http://localhost:5000/uploads/${project.image}`}
                                            alt={project.title}
                                            className='project-image-admin'
                                        />
                                    )}
                                </td>
                                <td>{project.title}</td>
                                <td>{project.deskripsi}</td>
                                <td>{project.kategori}</td>
                                <td>
                                    <button onClick={() => handleEdit(project)} className='blue-button'>Update</button>
                                    <button onClick={async () => {
                                        await fetch(`http://localhost:5000/api/project/${project._id}`, { method: "DELETE" });
                                        fetchProjects();
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            )}
        </section>
    );
}

export default AdminPage;