import React, { useState } from 'react';
import axios from 'axios';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../../helpers/AxiosHelper';
import Swal from "sweetalert2";

export const AgregarCategoriaComponent = () => {
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        urlImagen: '',
    });

    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

 const endpoint = "/categorias";
    const token = localStorage.getItem("token");
    setAuthHeader(token);

    const request = {
        nombre: formData.titulo,
        url_imagen: formData.urlImagen,
        descripcion: formData.descripcion
      };

    AxiosInstance.post(endpoint, request)
      .then((res) => {

        setMessage({ type: 'success', text: 'Categoría creada con éxito' });
        setFormData({ titulo: '', descripcion: '', urlImagen: '' });

        Swal.fire({
          title: "¡Éxito!",
          text: "La categoría se guardó correctamente.",
          icon: "success",
        });

      })
      .catch((error) => {
        setMessage({ type: 'error', text: 'Ocurrió un error al crear la categoría' });
        Swal.fire({
          icon: "error",
          text: "Error al guardar la categoría.",
        });
      })
      .finally(() => {
        clearAuthHeader();
      });



    };

    return (
        <div className="container py-4" style={{ backgroundColor: '#EEEFF2' }}>
            <div className="mb-4">
                <h4>Crear categoría</h4>
            </div>
            <form className="bg-light p-4 rounded shadow" onSubmit={handleSubmit}>
                <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="titulo" className="form-label text-primary">Título</label>
                        <input
                            type="text"
                            name="titulo"
                            className="form-control"
                            placeholder="Título"
                            value={formData.titulo}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="descripcion" className="form-label text-primary">Descripción</label>
                        <input
                            type="text"
                            name="descripcion"
                            className="form-control"
                            placeholder="Descripción"
                            value={formData.descripcion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row mb-4">
                    <label htmlFor="urlImagen" className="form-label text-primary">Imagen</label>
                    <div className="col-md-12 mb-3">
                        <input
                            type="text"
                            name="urlImagen"
                            className="form-control"
                            placeholder="Inserte la URL de la imagen"
                            value={formData.urlImagen}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Crear</button>

                {message && (
                    <div className={`alert mt-4 ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`}>
                        {message.text}
                    </div>
                )}
            </form>
        </div>
    );
};
