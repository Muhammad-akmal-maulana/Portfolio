import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './style/skill.css';

function Skill() {
    const [skills, setSkills] = useState([]);
    const API_URL = "http://localhost:5000/api/skill";
    const UPLOADS_URL = "http://localhost:5000/uploads";

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get(API_URL);
                setSkills(res.data);
            } catch (err) {
                console.error("Gagal memuat data skill:", err);
            }
        };

        fetchSkills();
    }, []);

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

    return (
        <section className='skill-section section' id='skill-page'>
            <h1 className='fade-in'>Skill</h1>
            <p className='fade-in sub-title'>Kemampuan Yang Saya Kuasai</p>

            <div className="skill-container flex">
                {skills.map((skill) => (
                    <div className="sub-skill-container" key={skill._id}>
                        <div className="skill">
                            {skill.image && (
                                <img
                                    src={getImageSrc(skill.image)}
                                    alt={skill.title}
                                    width="60"
                                />
                            )}
                            <p>{skill.title}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Skill;