import React from 'react';

function ProjectAdmin({ project, onEdit, onDeleted }) {
    async function handleDelete() {
        if (window.confirm("Yakin ingin menghapus project ini?")) {
            try {
                await fetch(`http://localhost:5000/api/project/${project._id}`, {
                    method: "DELETE",
                });
                onDeleted();
            } catch (err) {
                console.error("Gagal menghapus project:", err);
            }
        }
    }

    // potong setelah huruf ke N, tambahkan ...
    function batasiKata(text, limit = 21) {
        if (!text) return "";

        text = String(text).trim();
        if (text.length <= limit) return text;
        return text.slice(0, limit) + "…";
    }

    const imageUrl = project.image //menampilkan image yang sudah ditampilkan pada card
        ? `http://localhost:5000/uploads/${project.image}`
        : "";

    return (
        <tr className="">
            <td>
                {project.image && (
                    <img
                        src={imageUrl}
                        alt={project.title}
                        className='project-image-admin'
                    />
                )}
            </td>
            <td>{batasiKata(project.title, 21)}</td>
            <td>{batasiKata(project.deskripsi, 21)}</td>
            <td>{project.kategori}</td>

            <td>
                <div className="flex justify-center">
                    <button type="button" onClick={onEdit} className='update'>Update</button>
                    <button type="button" onClick={onOpenDelete} className='delete'>Delete</button>
                </div>
            </td>
        </tr>
    );
}

export default ProjectAdmin;
