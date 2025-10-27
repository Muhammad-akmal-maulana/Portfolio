import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../style/skillEdit.css';

function SkillEdit() {
    const [skills, setSkills] = useState([]);
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [show, setShow] = useState(false); //dropdown
    const dropdownRef = useRef(null);
    const fileRef = useRef(null);

    const API_URL = "http://localhost:5000/api/skill";
    const UPLOADS_URL = "http://localhost:5000/uploads";

    const getImageSrc = (image) => {
        if (!image || typeof image !== 'string') return null;
        const trimmed = image.trim();
        if (trimmed.startsWith('http') || trimmed.startsWith('blob:')) return trimmed;

        let path = trimmed.startsWith('/') ? trimmed.slice(1) : trimmed;
        if (path.startsWith('uploads/')) path = path.slice('uploads/'.length);
        if (path.includes('/')) {
            const segments = path.split('/').map(s => encodeURIComponent(s));
            return `${UPLOADS_URL}/${segments.join('/')}`;
        }
        return `${UPLOADS_URL}/${encodeURIComponent(path)}`;
    };
    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const res = await axios.get(API_URL);
            setSkills(res.data);
        } catch (err) {
            console.error("Gagal memuat data skill:", err);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        if (image) formData.append("image", image);

        try {
            if (editingId) {
                await axios.put(`${API_URL}/${editingId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            } else {
                await axios.post(API_URL, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

            // on success reset the form and close the modal
            resetForm();
            fetchSkills();
            setShow(false);
        } catch (err) {
            console.error("Gagal menyimpan skill:", err);
        }
    };

    const handleEdit = (skill) => {
        setEditingId(skill._id);
        setTitle(skill.title);
        setPreview(skill.image ? getImageSrc(skill.image) : null);
        // open the form/modal so user can edit immediately
        setShow(true);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchSkills();
        } catch (err) {
            console.error("Gagal menghapus skill:", err);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setTitle("");
        setImage(null);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className='edit-skill'>
            <section className='skill-section section'>
                <div className="flex justify-beetween align-item-center">
                    <h1>Skill</h1>
                    <button
                        className='blue-button'
                        onClick={() => setShow(!show)}
                    >New Skill</button>
                </div>

                <div className="skill-container flex">
                    {skills.map((skill) => (
                        <div className="sub-skill-container" key={skill._id}>
                            <div className="skill">
                                {skill.image && (
                                    <img
                                        src={`${UPLOADS_URL}/${encodeURIComponent(skill.image)}`}
                                        alt={skill.title}
                                        width="80"
                                    />
                                )}
                                <p>{skill.title}</p>
                                <div className="">
                                    <button
                                        type="button"
                                        onClick={() => handleEdit(skill)}
                                        className='blue-button'
                                    ><i className="bi bi-pencil-fill"></i></button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(skill._id)}
                                        className='red-button'
                                    ><i className="bi bi-trash-fill"></i></button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        onClick={() => setShow(!show)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            fill="currentColor"
                            className="bi bi-plus-lg"
                            viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                        </svg>
                    </button>
                </div>
            </section>

            {show && (
                <section
                    ref={dropdownRef}
                    className='pop-edit-skill flex align-item-center justify-center'
                >
                    <div className="blue-button header">

                        <div className="flex justify-beetween align-item-center">
                            <p>{editingId ? "Edit Skill" : "Tambah Skill"}</p>
                            <button type="button" onClick={() => setShow(false)}>
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div>
                                <p>Judul:</p>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Masukkan nama skill"
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor='edit-skill'
                                    className={editingId ? "edit-gambar blue-button" : "tambah-gambar blue-button"}
                                >{editingId ? "Edit Gambar" : "Tambah Gambar"}</label>
                                <input
                                    id='edit-skill'
                                    type="file"
                                    ref={fileRef}
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>

                            {preview && <img src={preview} alt="Preview" width="100" />}

                            <button type="submit">
                                {editingId ? "Update Skill" : "Tambah Skill"}
                            </button>
                            {editingId && <button type="button" onClick={resetForm}>Batal</button>}
                        </form>
                    </div>
                </section>
            )}
        </div>
    );
}

export default SkillEdit;