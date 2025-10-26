import React, { useEffect, useState, useRef } from 'react';

function AboutmeEdit({ resetForm }) {
    const [loading, setLoading] = useState(true);
    const [about, setAbout] = useState(null);
    const [nama, setNama] = useState('')
    const [deskripsi, setDeskripsi] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileRef = useRef(null);

    useEffect(() => {
        async function fetchAbout() {
            try {
                const res = await fetch('http://localhost:5000/api/aboutme');
                const data = await res.json();

                if (!res.ok) throw new Error(data.message || 'Gagal mengambil data');

                if (data && Object.keys(data).length) {
                    setAbout(data);
                    setNama(data.nama || '');
                    setDeskripsi(data.deskripsi || '');
                    setPreview(data.image ? `http://localhost:5000/uploads/${data.image}` : null);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        fetchAbout();
    }, []);

    // preview gambar baru
    useEffect(() => {
        if (!imageFile) return;
        const url = URL.createObjectURL(imageFile);
        setPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [imageFile]);

    // handle perubahan file
    const handleFileChange = (e) => {
        const f = e.target.files && e.target.files[0];
        setImageFile(f || null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        // if creating new about (no existing about), require an image
        if (!about && !imageFile) {
            alert('Silakan pilih gambar sebelum menyimpan.');
            return;
        }

        form.append('nama', nama);
        form.append('deskripsi', deskripsi);
        if (imageFile) form.append('image', imageFile);

        try {
            let res;
            if (about && about._id) {
                res = await fetch(`http://localhost:5000/api/aboutme/${about._id}`, {
                    method: 'PUT',
                    body: form,
                });
            } else {
                res = await fetch('http://localhost:5000/api/aboutme', {
                    method: 'POST',
                    body: form,
                });
            }

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                throw new Error(err.message || 'Gagal menyimpan');
            }

            const saved = await res.json();
            setAbout(saved);

            // on success: keep form populated with saved data (do not reset fields)
            alert('Berhasil disimpan');

            // reflect saved values back to the form so admin sees the stored record
            setNama(saved.nama || nama);
            setDeskripsi(saved.deskripsi || deskripsi);
            if (saved.image) {
                setPreview(`http://localhost:5000/uploads/${saved.image}`);
            }
            
        } catch (err) {
            console.error(err);
            alert(err.message || 'Gagal menyimpan about me');
        }
    };

    return (
        <section className='section'>
            <div className="">
                <h1>Edit About Me</h1>
            </div>

            <form onSubmit={handleSubmit} className="">
                <div>
                    <label>Animasi Nama</label>
                    <input
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        placeholder="Masukkan nama"
                        required
                    />
                </div>

                <div>
                    <label>Deskripsi</label>
                    <textarea 
                        placeholder='Masukkan Deskripsi'
                        value={deskripsi} 
                        onChange={(e) => setDeskripsi(e.target.value)} 
                        rows={6} 
                        required
                    />
                </div>

                <div className="">
                    {preview ? (
                        <div>
                            <img 
                                src={preview} 
                                alt="preview" 
                                style={{ maxWidth: 240 }} 
                            />
                            <label htmlFor="aboutme-img">Edit Gambar</label>
                        </div>
                    ) : (
                        <div>
                            <label htmlFor="aboutme-img">Tambah Gambar</label>
                        </div>
                    )}

                    <div>
                        <input 
                            id='aboutme-img'
                            type="file" 
                            accept="image/*" 
                            onChange={handleFileChange} 
                            ref={fileRef} 
                        />
                    </div>
                </div>

                <div>
                    <button type="submit" className="blue-button">Simpan</button>
                </div>
            </form>
        </section>
    );
}

export default AboutmeEdit;
