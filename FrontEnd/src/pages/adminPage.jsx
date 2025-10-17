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
    const [filter, setFilter] = useState('all');

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

    const visibleProjects = filter === 'all' ? projects : projects.filter(p => p.kategori === filter);

    // potong setelah kata ke N, tambahkan ...
    function batasiKata(text, limit = 4) {
        if (!text) return "";
        const words = String(text).trim().split(/\s+/);
        if (words.length <= limit) return text;
        return words.slice(0, limit).join(" ") + "…";
    }

    return (
        <section className='section admin-section'>
            {/* div ini bakal muncul ketika tidak ada project yang sedang diedit / mode create */}
            {!createMode && !editingProject && projects.length > 0 && (
                <div className="">
                    <div className="flex justify-beetween align-item-center admin-title">
                        <h1>Admin Page</h1>
                        <button
                            onClick={handleLogout}
                            className='red-button logout box-shadow'
                        >Log Out</button>
                    </div>

                    <div className="flex justify-center">
                        
                        <div className="filter-container">
                            <button
                                onClick={() => setFilter('pkl')}
                                aria-pressed={filter === 'pkl'}
                            >PKL</button>
                            <button
                                onClick={() => setFilter('non-pkl')}
                                aria-pressed={filter === 'non-pkl'}
                            >Non PKL</button>
                            <button
                                onClick={() => setFilter('all')}
                                aria-pressed={filter === 'all'}
                            >All</button>
                            <button onClick={handleCreateClick}>+ New Project</button>
                        </div>
                    </div>
                </div>
            )}

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

                <>
                    <table className='table-admin'>
                        <thead>
                            <tr>
                                <th>Gambar Project</th>
                                <th>Judul</th>
                                <th>Deskripsi</th>
                                <th>Kategori</th>
                                <th>Update & Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleProjects.map((project) => (
                                <tr key={project._id}>
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
                                    <td>{batasiKata(project.deskripsi, 4)}</td> {/* 4 bisa diganti sesuai kebutuhan */}
                                    <td>{project.kategori}</td>
                                    <td className='flex'>
                                        <button onClick={() => handleEdit(project)} className='blue-button'>Update</button>
                                        <button onClick={async () => {
                                            await fetch(`http://localhost:5000/api/project/${project._id}`, { method: "DELETE" });
                                            fetchProjects();
                                        }}
                                            className='red-button'
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {projects.length === 0 && !createMode && !editingProject && (
                        <div className='new-button-container flex justify-center'>
                            <button
                                onClick={handleCreateClick}
                                className='blue-button new-project-button2 box-shadow'
                            >+ New Project</button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

export default AdminPage;