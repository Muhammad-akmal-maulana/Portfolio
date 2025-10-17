import React, { useState, useEffect, useRef } from "react";
import '../style/projectForm.css'

function ProjectForm({ onSubmit, initialData = {}, resetForm }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [deskripsi, setDeskripsi] = useState(initialData.deskripsi || "");
  const [kategori, setKategori] = useState(initialData.kategori || "pkl");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(initialData.image || "");
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
    setFileName(initialData.image || "");
    if (fileInputRef.current) fileInputRef.current.value = ""; // reset file input saat edit

  }, [initialData.id]);

  useEffect(() => { //menampilkan gambar yang diinput
    if (image) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    setImage(file || null);
    setFileName(file ? file.name : ""); // update displayed filename
  };

  //reset form jika reset form berubah
  useEffect(() => {
    if (resetForm) {
      setTitle("");
      setDeskripsi("");
      setKategori("pkl");
      setImage(null);
      setPreview(null);
      setFileName("");

      if (fileInputRef.current) fileInputRef.current.value = ""; // reset file input
    }
  }, [resetForm]);

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
    <form onSubmit={handleSubmit} className="project-form box-shadow flex justifiy-between">
      <div className="img-container flex justifiy-center">

        {preview ? (
          <div className="add-image-after"> {/* cuma muncul saat ada gambar */}
            <label className="blue-button" htmlFor="image-upload">Ganti Foto</label>
            <p className="file-name">{fileName}</p> {/* tampilkan nama file di <p> */}
          </div>
        ) : null}

        {!preview ? (
          <div className="add-image-before flex justify-center"> {/* jika belum ada gambar dan jika sudah ada maka akan menghilang*/}
            <label className="blue-button" htmlFor="image-upload">Tambah Foto</label>
          </div>
        ) : null}

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden-file-input"
          required />
        {preview && (
          <img
            src={preview}
            alt="preview"
            className="preview-image"
          />
        )}
      </div>

      <div className="sub-form">
        <div className="">
          <p>Title</p>
          <input
            type="text"
            placeholder="Judul project"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="title"
          />
        </div>

        <div className="deskripsi-title">
          <p>Deskripsi</p>
          <div className="">
            <input
              type="text"
              placeholder="Deskripsi singkat"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="">
          <label>Kategori</label>
          <select value={kategori} onChange={(e) => setKategori(e.target.value)} required>
            <option value="pkl">pkl</option>
            <option value="non-pkl">non-pkl</option>
          </select>
        </div>

        <div>
          <button type="submit" className="blue-button">Simpan</button>
        </div>
      </div>
    </form>
  );
}

export default ProjectForm;