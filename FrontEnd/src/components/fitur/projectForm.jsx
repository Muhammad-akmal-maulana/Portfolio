import React, { useState, useEffect, useRef } from "react";
import '../style/projectForm.css'
import Dropdown from "./dropdown";

function ProjectForm({ onSubmit, initialData = {}, resetForm }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [deskripsi, setDeskripsi] = useState(initialData.deskripsi || "");
  const [kategori, setKategori] = useState(initialData.kategori || "pkl");
  const [show, setShow] = useState(false); //dropdown simple
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState(initialData.image || "");
  const fileInputRef = useRef(null);
  const isEditing = Boolean(initialData && (initialData._id || initialData.id));

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

  }, [initialData._id, initialData.id]);

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
    
    const payload = {
      title: title.trim(),
      deskripsi: deskripsi.trim(),
      kategori,
      image, 
    };
    
    console.log("Submitting form payload:", payload);
    onSubmit && onSubmit(payload);
  };
  
    //dropdown
    const handleSelect = (value) => {
      setKategori(value);
      setShow(false); // tutup dropdown setelah memilih
    };
  
  return (
    <form onSubmit={handleSubmit} className="project-form box-shadow flex justifiy-between align-item-center">
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
          required={!isEditing} 
        />
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
          <div className="deskripsi">
            <textarea
              placeholder="Deskripsi singkat"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        <div className="flex align-item-center kategori">
          <label>Kategori</label>
          <div className="dropdown-kategori">
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="flex align-item-center justify-beetween kategori-trigger"
            >
              <p>
                {kategori === "pkl" ? "PKL" : "Non-PKL"}
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                fill="currentColor"
                class="bi bi-chevron-down"
                viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
              </svg>
            </button>

            {show && (
              <div className="kategori-content">
                <button
                  type="button"
                  className={kategori === "pkl" ? "active" : ""}
                  onClick={() => handleSelect("pkl")}
                >
                  PKL
                </button>

                <button
                  type="button"
                  className={kategori === "non-pkl" ? "active" : ""}
                  onClick={() => handleSelect("non-pkl")}
                >
                  Non-PKL
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <button type="submit" className="blue-button">Simpan</button>
        </div>
      </div>
    </form>
  );
}

export default ProjectForm;