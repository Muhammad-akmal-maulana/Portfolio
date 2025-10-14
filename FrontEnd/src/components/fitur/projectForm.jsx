import React, { useState, useEffect } from "react";

function ProjectForm({ onSubmit, initialData = {} }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [kategori, setKategori] = useState(initialData.kategori || "pkl"); // default 'pkl'
  const [image, setImage] = useState(null);

  useEffect(() => {
    // hanya reset jika initialData benar-benar berbeda (misalnya untuk edit mode)
    setTitle(initialData.title || "");
    setDescription(initialData.description || "");
    setKategori(initialData.kategori || "pkl");
    setImage(null); // reset image pada saat edit
  }, [initialData.id])

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    // kirim objek form sederhana, handler parent akan membungkus ke FormData jika perlu
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      kategori,
      image,
    });
    // optional: reset form
    // setTitle(""); setDescription(""); setKategori("pkl"); setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="project-form">
      <div className="">
        <label>Title</label>
        <input
          type="text"
          placeholder="Judul project"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="">
        <label>Deskripsi</label>
        <textarea
          placeholder="Deskripsi singkat"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>

      <div className="">
        <label>Kategori</label>
        <select value={kategori} onChange={(e) => setKategori(e.target.value)} required>
          <option value="pkl">pkl</option>
          <option value="non-pkl">non-pkl</option>
        </select>
      </div>

      <div className="">
        <label>Gambar</label>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleFileChange} 
          required/>
      </div>

      <div className="">
        <button type="submit">Simpan</button>
      </div>
    </form>
  );
}

export default ProjectForm;