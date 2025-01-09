import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { AxiosInstance } from "../../../helpers/AxiosHelper";

const FormularioNuevoProducto = (props) => {
  const [categorias, setCategorias] = useState([]);
  const [isLoadingCategoria, setIsLoadingCategoria] = useState(false);
  const [hayErrorCategoria, setHayErrorCategoria] = useState(false);
  const [errorCategoria, setErrorCategoria] = useState();

  const navigate = useNavigate();
  const form = useRef(null);

  const headerStyles = {
    backgroundColor: '#0d6efd',
    color: '#ffffff',
  };


  useEffect(() => {

    //  Carga de categorias
    setIsLoadingCategoria(true);
    const endpoint = "/categorias";
    AxiosInstance.get(endpoint)
      .then((res) => {
        setCategorias(res.data);
        setIsLoadingCategoria(false);
        setHayErrorCategoria(false);
      })
      .catch((error) => {
        setCategorias(new Array());
        setIsLoadingCategoria(false);
        setHayErrorCategoria(true);
        setErrorCategoria(error);

      });
  }, []);



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



  const submitHandler = (event) => {
    event.preventDefault();

    const endpoint = 'productos';
    const token = '';
    const postDataProducto = {
      titulo: form.current.querySelector("#titulo").value,
      descripcion: form.current.querySelector("#descripcion").value,
      categoria: {
        id: form.current.querySelector("#categorias-select").value
      }
    };

    const header = {
      Authorization: `Bearer ${token}`
    };

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

    ]

    //post de products
    AxiosInstance.post(`/productos`, postDataProducto, header)
      .then((res) => {
        imagenesRequests.forEach((unRequest, index) => {

          // se le agrega el id del producto al que pertenece
          unRequest.producto = {
            id: res.data.id
          };

          AxiosInstance.post(`/imagenes`, unRequest, header)
            .then((res) => {
              //si la ultima imagen es correcta entonces redirigir a producto exitoso
              //index === values.imagenes.length - 1 && navigate('producto-exitoso');

            })
            .catch((error) => {
              Swal.fire({
                icon: 'error',
                text: 'No se pudo guardar la imagen'
              })
            })

          // fin del foreach imagenes
        });

        mensajeOperacionExitosa();

        //  fin post producto
      })
      .catch((error) => {
        error
        mensajeOperacionError(error.response.data);
      });

  };

  return (
    <>

      <div className="container py-4" style={{ backgroundColor: '#EEEFF2' }}>
        <div className="mb-4">
          <h4>Crear alojamiento</h4>
        </div>
        <form ref={form} onSubmit={submitHandler} className="bg-light p-4 rounded shadow">
          <div className="row mb-4">
            <div className="col-md-6 mb-3">
              <label htmlFor="titulo" className="form-label text-primary">Título</label>
              <input
                type="text"
                name="titulo"
                id="titulo"
                className="form-control"
                placeholder="Título"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="categorias" className="form-label text-primary">Categoría</label>
              {hayErrorCategoria ? (
                <div className="text-danger">Hubo un error al cargar las categorías.</div>
              ) : (
                <select
                  name="categorias"
                  id="categorias-select"
                  className="form-select"
                  required
                  defaultValue="#"
                >
                  <option value="#" disabled>
                    Seleccione una categoría
                  </option>
                  {categorias.map((unaCategoria) => (
                    <option
                      key={`categoria-${unaCategoria.id}`}
                      value={unaCategoria.id}
                    >
                      {unaCategoria.nombre}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion" className="form-label text-primary">Descripción</label>
            <textarea
              name="descripcion"
              id="descripcion"
              className="form-control"
              cols="30"
              rows="10"
              required
              maxLength={500}
              style={{ resize: 'none' }}
            ></textarea>
          </div>
          <div className="mb-4">
            <h3 className="text-primary">Cargar imágenes</h3>
          </div>
          <div className="row mb-4">
            {[...Array(5)].map((_, index) => (
              <div className="col-md-12 mb-3" key={index}>
                <input
                  className="form-control"
                  type="text"
                  name={`imagen-${index + 1}`}
                  id={`imagen-${index + 1}`}
                  placeholder="Inserte la URL de la imagen"
                  required
                />
              </div>
            ))}
          </div>
          <button type="submit" className="btn btn-primary">
            Crear
          </button>
        </form>
      </div>
    </>
  );
};


export default FormularioNuevoProducto;
