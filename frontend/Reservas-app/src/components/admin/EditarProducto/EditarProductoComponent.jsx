import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../../helpers/AxiosHelper";
import Swal from 'sweetalert2';

export const EditarProductoComponent = () => {

    const { id } = useParams(); // Obtener el idProducto desde el path

    const [categorias, setCategorias] = useState([]);
    const [isLoadingCategorias, setIsLoadingCategorias] = useState(false);
    const [hayErrorCategorias, setHayErrorCategorias] = useState(false);
    const [errorCategorias, setErrorCategorias] = useState();


    const [producto, setProducto] = useState([]);
    const [isLoadingProducto, setIsLoadingProducto] = useState(false);
    const [hayErrorProducto, setHayErrorProducto] = useState(false);
    const [errorProducto, setErrorProducto] = useState();

    const [isLoadingGuardarProducto, setIsLoadingGuardarProducto] = useState(false);
    const [hayErrorGuardarProducto, setHayErrorGuardarProducto] = useState(false);
    const [errorGuardarProducto, setErrorGuardarProducto] = useState();




    const mensajeOperacionExitosa = () => {
        Swal.fire({
            title: '¡Éxito!',
            text: 'La operación se realizó correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });
    };


    const mensajeOperacionError = (mensaje) => {
        Swal.fire({
            icon: 'error',
            text: mensaje
        });
    };


    useEffect(() => {

        //  busco los productos
        const fetchProducts = async () => {
            //  Carga de productos
            setIsLoadingProducto(true);
            const endpoint = "/productos/" + id;
            
    //  en enpoints publicos, no se envia token
    setAuthHeader(false);

            AxiosInstance.get(endpoint)
                .then((res) => {
                    setProducto(res.data);
                    setIsLoadingProducto(false);
                    setHayErrorProducto(false);
                    fetchCategories();
                })
                .catch((error) => {
                    setProducto(new Array());
                    setIsLoadingProducto(false);
                    setHayErrorProducto(true);
                    setErrorProducto(error);
                    mensajeOperacionError("Error al cargar el producto");
                })
                .finally(() => {
                    // Limpiar el token después de la solicitud
                    clearAuthHeader();
                  });;


        };

        //  busco las categorias
        const fetchCategories = async () => {
            //  Carga de categorias
            setIsLoadingCategorias(true);
            const endpoint = "/categorias";

            //  en enpoints publicos, no se envia token
            setAuthHeader(false);

            AxiosInstance.get(endpoint)
                .then((res) => {
                    setCategorias(res.data);
                    setIsLoadingCategorias(false);
                    setHayErrorCategorias(false);
                })
                .catch((error) => {
                    setCategorias(new Array());
                    setIsLoadingCategorias(false);
                    setHayErrorCategorias(true);
                    setErrorCategorias(error);
                    mensajeOperacionError("Error al cargar las categorias");

                })
                .finally(() => {
                    // Limpiar el token después de la solicitud
                    clearAuthHeader();
                });;
        }

        fetchProducts();
        
    }, []);


    const form = useRef(null);

const guardarImagenes = () =>{

    const token = localStorage.getItem("token");
    setAuthHeader(token);
                    
    const endpoint = "/imagenes";
    AxiosInstance.put(endpoint, productoActualizado)
        .then((res) => {
            setIsLoadingGuardarProducto(false);
            setHayErrorGuardarProducto(false);
            mensajeOperacionExitosa();
            guardarImagenes();
        })
        .catch((error) => {
            setIsLoadingGuardarProducto(false);
            setHayErrorGuardarProducto(true);
            setErrorGuardarProducto(error);
            mensajeOperacionError(error.response.data);
        })
        .finally(() => {
            // Limpiar el token después de la solicitud
            clearAuthHeader();
        });;



    const imagenesRequests = [
        {
          "url": form.current.querySelector("#imagen-1").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-2").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-3").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-4").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-5").value,
          "titulo": "Imagen"
        }
  
      ];

      imagenesRequests.forEach((unRequest, index) => {
      
                // se le agrega el id del producto al que pertenece
                unRequest.producto = {
                  id: res.data.id
                };
      
                const token = localStorage.getItem("token");
                setAuthHeader(token);

                AxiosInstance.post(`/imagenes`, unRequest, header)
                  .then((res) => {
                    //si la ultima imagen es correcta entonces redirigir a producto exitoso
                    //index === values.imagenes.length - 1 && navigate('producto-exitoso');
      
                  })
                  .catch((error) => {
                    Swal.fire({
                      icon: 'error',
                      text: 'No se pudo guardar la imagen'
                    });
                    
                  })
                  .finally(() => {
                    // Limpiar el token después de la solicitud
                    clearAuthHeader();
                });
      
                // fin del foreach imagenes
              });
  

}


    // Manejar el envío del formulario
    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData(form.current);

        // Construir el objeto producto
        const productoActualizado = {
            id: producto.id,
            titulo: formData.get("titulo"),
            descripcion: formData.get("descripcion"),
            categoria: {
                id: parseInt(formData.get("categorias"), 10),
            }
            ,
            imagenes: Array.from({ length: 5 }).map((_, index) => ({
                titulo: "Imagen",
                url: formData.get(`imagen-${index + 1}`),
                producto: {
                    id: producto.id,
                },
            })),
        };

        // Llamar a la API para actualizar el producto

        setIsLoadingGuardarProducto(true);
        const endpoint = "/productos/" + id;
        
        const token = localStorage.getItem("token");
        setAuthHeader(token);
				
        AxiosInstance.put(endpoint, productoActualizado)
            .then((res) => {
                setIsLoadingGuardarProducto(false);
                setHayErrorGuardarProducto(false);
                mensajeOperacionExitosa();
            })
            .catch((error) => {
                setIsLoadingGuardarProducto(false);
                setHayErrorGuardarProducto(true);
                setErrorGuardarProducto(error);
                mensajeOperacionError(error.response.data);
            })
            .finally(() => {
                // Limpiar el token después de la solicitud
                clearAuthHeader();
            });
            
            ;


    };

    if (hayErrorProducto || categorias.length === 0) {
        return <div>Error al cargar el producto...</div>;
    }

    return (
        <div className="container py-4" style={{ backgroundColor: "#EEEFF2" }}>
            <div className="mb-4">
                <h4>Editar alojamiento</h4>
            </div>
            <form ref={form} onSubmit={submitHandler} className="bg-light p-4 rounded shadow">
                <div className="row mb-4">
                    <div className="col-md-6 mb-3">
                        <label htmlFor="titulo" className="form-label text-primary">
                            Título
                        </label>
                        <input
                            type="text"
                            name="titulo"
                            id="titulo"
                            className="form-control"
                            placeholder="Título"
                            required
                            defaultValue={producto.titulo}
                        />
                    </div>
                    <div className="col-md-6 mb-3">
                        <label htmlFor="categorias" className="form-label text-primary">
                            Categoría
                        </label>
                     
                            <select
                                name="categorias"
                                id="categorias-select"
                                className="form-select"
                                required
                                defaultValue={producto.categoria.id}
                            >
                                <option value="#" disabled>
                                    Seleccione una categoría
                                </option>
                                {categorias.map((unaCategoria) => (
                                    <option key={`categoria-${unaCategoria.id}`} value={unaCategoria.id}>
                                        {unaCategoria.nombre}
                                    </option>
                                ))}
                            </select>
                       
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="descripcion" className="form-label text-primary">
                        Descripción
                    </label>
                    <textarea
                        name="descripcion"
                        id="descripcion"
                        className="form-control"
                        cols="30"
                        rows="10"
                        required
                        maxLength={500}
                        style={{ resize: "none" }}
                        defaultValue={producto.descripcion}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <h3 className="text-primary">Cargar imágenes</h3>
                </div>
                <div className="row mb-4">
                    {producto.imagenes.map((imagen, index) => (
                        <div className="col-md-12 mb-3" key={index}>
                            <input
                                className="form-control"
                                type="text"
                                name={`imagen-${index + 1}`}
                                id={`imagen-${index + 1}`}
                                placeholder="Inserte la URL de la imagen"
                                required
                                defaultValue={imagen.url}
                            />
                        </div>
                    ))}
                </div>
                <button type="submit" className="btn btn-primary">
                    Guardar
                </button>
            </form>
        </div>
    );
};

