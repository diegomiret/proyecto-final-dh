import React, { useEffect, useState } from 'react'
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../../helpers/AxiosHelper';
import Swal from "sweetalert2";

export const EliminarCategorias = () => {
    const [categorias, setCategorias] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');


    useEffect(() => {

        //  Obtengo las ctagorias
        setAuthHeader(false);
        const endpoint = "/categorias";
        AxiosInstance.get(endpoint)
            .then((res) => {
                setCategorias(res.data);
            })
            .catch((error) => {
                console.error('Error al consultar categorias:', error);

            })
            .finally(() => {
                // Limpiar el token después de la solicitud
                clearAuthHeader();
            });

    }, []);

    // abro el  modal y obtengo los productos 
    const handleOpenModal = (id) => {


        //  Obtengo las productos por categoria
        setAuthHeader(false);

        const endpoint = `/productos/categoria/${id}`;
        AxiosInstance.get(endpoint)
            .then((res) => {
                console.log("DEovlvio los producto: ", res.data.length);
                setSelectedCategoria(id);

                if (res.data.length == 0){
                    setModalMessage("No hay alojamientos asociados a la categoria.");
                }else{
                    setModalMessage("Hay " + res.data.length + " alojamientos asociados a la categoria");
                }

        
                setModalVisible(true);
            })
            .catch((error) => {
                console.error('Error al consultar productos:', error);

            })
            .finally(() => {
                // Limpiar el token después de la solicitud
                clearAuthHeader();
            });

    };


    // Handle eliminar categoria
    const handleDelete = () => {
        if (selectedCategoria) {

            const token = localStorage.getItem("token");
            setAuthHeader(token);
            const endpoint = `/categorias/${selectedCategoria}`;
            AxiosInstance.delete(endpoint)
                .then((res) => {
                    setCategorias((prevCategorias) =>
                        prevCategorias.filter((cat) => cat.id !== selectedCategoria)
                    );

                           Swal.fire({
                                title: "¡Éxito!",
                                text: "La categoría se eliminó correctamente.",
                                icon: "success",
                              });

                    setModalVisible(false);
                })
                .catch((error) => {
                    console.error('Error al eliminar la categoria:', error);

                })
                .finally(() => {
                    // Limpiar el token después de la solicitud
                    clearAuthHeader();
                });

        }
    };

    // cerrar  modal
    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedCategoria(null);
        setModalMessage('');
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Lista de Categorías</h2>
            <table className="table table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {categorias.map((categoria) => (
                        <tr key={categoria.id}>
                            <td>{categoria.id}</td>
                            <td>{categoria.nombre}</td>
                            <td>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleOpenModal(categoria.id)}
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {modalVisible && (
                <div className="modal show d-block" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirmar de eliminación</h5>
                                {/* <button
                                    type="button"
                                    className="close"
                                    onClick={handleCloseModal}
                                >
                                    <span>&times;</span>
                                </button> */}
                            </div>
                            <div className="modal-body">
                                <p>{modalMessage}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={handleDelete}
                                >
                                   Eliminar
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={handleCloseModal}
                                >
                                    No eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};