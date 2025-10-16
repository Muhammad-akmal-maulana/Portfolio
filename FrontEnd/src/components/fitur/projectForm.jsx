import React, { useState, useEffect, useRef } from "react";

function ProjectForm({ onSubmit, initialData = {}, resetForm }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [deskripsi, setDeskripsi] = useState(initialData.deskripsi || "");
  const [kategori, setKategori] = useState(initialData.kategori || "pkl"); // default 'pkl'
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // reset saat ganti mode, misal dari tambah ke edit
    setTitle(initialData.title || "");
    setDeskripsi(initialData.deskripsi || "");
    setKategori(initialData.kategori || "pkl");
    setImage(null); 
    setPreview(
      initialData.image
        ? `http://localhost:5000/uploads/${initialData.image}`
        : null
    );
    if (fileInputRef.current) fileInputRef.current.value = ""; // reset file input saat edit

  }, [initialData.id]);

  useEffect(() => { //menampilkan gambar yang diinput
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  //reset form jika reset form berubah
  useEffect(() => {
    if (resetForm) {
      setTitle("");
      setDeskripsi("");
      setKategori("pkl");
      setImage(null);
      setPreview(null);

      if (fileInputRef.current) fileInputRef.current.value = ""; // reset file input
    }
  }, [resetForm]);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      deskripsi: deskripsi.trim(),
      kategori,
      image,
    });

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
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
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
          ref={fileInputRef}
          required />
        {preview && (
          <img
            src={preview}
            alt="preview"
            style={{ maxWidth: "240px", maxHeight: "160px", marginTop: 8, display: "block" }}
          />
        )}
      </div>

      <div className="">
        <button type="submit">Simpan</button>
      </div>
    </form>
  );
}

export default ProjectForm;