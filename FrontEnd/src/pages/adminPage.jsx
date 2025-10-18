import React, { useState, useEffect, useRef } from 'react';
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

    const [showLogout, setShowLogout] = useState(false); //dropdown
    // showDelete menyimpan id project yang popup delete-nya terbuka, null = tidak ada
    const [showDelete, setShowDelete] = useState(null); //dropdown
    const dropdownRef = useRef(null); // dropdown bakal ketutup kalau klik di luar dropdown content

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
        fetchProjects(); //mengambil project

        //dropdown close ketika klik di luar dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowLogout(false);
                setShowDelete(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // tambah helper delete yang menutup popup setelah sukses
    const handleDeleteProject = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/project/${id}`, { method: "DELETE" });
            if (!res.ok) throw new Error("Gagal menghapus project");
            await fetchProjects();
            setShowDelete(false); // tutup popup setelah sukses
        } catch (err) {
            console.error(err);
            alert("Gagal menghapus project");
        }
    };

    const visibleProjects = filter === 'all' ? projects : projects.filter(p => p.kategori === filter);

    // potong setelah huruf ke N, tambahkan ...
    function batasiKata(text, limit = 21) {
        if (!text) return "";

        text = String(text).trim();
        if (text.length <= limit) return text;
        return text.slice(0, limit) + "…";
    }

    return (
        <section className='section admin-section'>
            {/* div ini bakal muncul ketika tidak ada project yang sedang diedit / mode create */}
            {!createMode && !editingProject && (
                <div className="">
                    <div className="flex justify-beetween align-item-center admin-title">
                        <h1>Admin Page</h1>
                        <button
                            onClick={() => setShowLogout(!showLogout)}
                            className='red-button close'
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                fill="currentColor"
                                class="bi bi-x"
                                viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                            </svg>
                        </button>

                        {showLogout && (
                            <>
                                <div className='popup-container flex justify-center align-item-center'>
                                    <div className="blur-bg white-bg"></div>

                                    <div
                                        className='sub-popup-container box-shadow'
                                        ref={dropdownRef}
                                    >
                                        <div className="blue-button header">
                                            <div className="flex justify-beetween align-item-center">
                                                <p>Log Out</p>
                                                <button
                                                    type="button"
                                                    onClick={() => setShowLogout(false)}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="30"
                                                        fill="currentColor"
                                                        class="bi bi-x"
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
                                                    onClick={() => setShowLogout(false)}
                                                    className='stay'
                                                >Cancel</button>

                                                <button
                                                    onClick={handleLogout}
                                                    className='red-button red-onet'
                                                >Pretty Sure</button>
                                            </div>

                                        </div>


                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="flex justify-center">

                        <div className="filter-container">
                            {projects.length > 0 ? (
                                <>
                                    <button onClick={() => setFilter('pkl')}>PKL</button>
                                    <button onClick={() => setFilter('non-pkl')}>Non PKL</button>
                                    <button onClick={() => setFilter('all')}>All</button>
                                    <button onClick={handleCreateClick}>+ New Project</button>
                                </>
                            ) : null}
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
                                    <td>{batasiKata(project.deskripsi, 21)}</td> {/* 4 bisa diganti sesuai kebutuhan */}
                                    <td>{project.kategori}</td>

                                    <td>
                                        <div className="flex justify-center">
                                            <button onClick={() => handleEdit(project)} className='update'>Update</button>

                                            <button
                                                type="button"
                                                onClick={() => setShowDelete(project._id)} // buka popup untuk project ini
                                                className='delete'
                                            >Delete</button>

                                            {showDelete === project._id && (
                                                <div className="popup-container flex justify-center align-item-center">
                                                    <div className="blur-bg white-bg1"></div>

                                                    <div
                                                        className="sub-popup-container box-shadow"
                                                        ref={dropdownRef}
                                                    >
                                                        <div className="blue-button header">
                                                            <div className="flex justify-beetween align-item-center">
                                                                <p>Delete</p>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowDelete(null)}
                                                                >
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="30"
                                                                        fill="currentColor"
                                                                        class="bi bi-x"
                                                                        viewBox="0 0 16 16">
                                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                                                    </svg>
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <div className="sub-popup">
                                                            <div className="flex align-item-center justify-beetween middle-popup">
                                                                <div className="popup-image">
                                                                    {project.image ? (
                                                                        <img
                                                                            src={`http://localhost:5000/uploads/${project.image}`}
                                                                            alt={project.title}
                                                                            className="popup-image"
                                                                        />
                                                                    ) : null}
                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        width="50"
                                                                        fill="currentColor"
                                                                        class="bi bi-x"
                                                                        viewBox="0 0 16 16">
                                                                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                                                    </svg>
                                                                </div>
                                                                <div className="popup-text">
                                                                    <p>Are you sure you want to permanently delete</p>
                                                                    <p> <span>{project.title}</span> ?</p>
                                                                </div>
                                                            </div>

                                                            <div className="flex justify-center align-item-center popbutton-container">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setShowDelete(null)}
                                                                    className='stay'
                                                                >Cancel</button>

                                                                <button
                                                                    onClick={async () => { await handleDeleteProject(project._id); }}
                                                                    className='red-button red-one'
                                                                >Delete</button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            )}
                                        </div>
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