import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../../helpers/AxiosHelper";
import { User } from "../../../ReservaHotelesApp";
import { SelectorDeCaracteristicasComponent } from "./SelectorDeCaracteristicasComponent";

const FormularioNuevoProducto = () => {
  const [categorias, setCategorias] = useState([]);
  const [isLoadingCategoria, setIsLoadingCategoria] = useState(false);
  const [hayErrorCategoria, setHayErrorCategoria] = useState(false);
  const [errorCategoria, setErrorCategoria] = useState();

  const [ciudades, setCiudades] = useState([]);
  const [isLoadingCiudades, setIsLoadingCiudades] = useState(false);
  const [hayErrorCiudades, setHayErrorCiudades] = useState(false);
  const [errorCiudades, setErrorCiudades] = useState();

  const [selectedTags, setSelectedTags] = useState([]);

      const [politicas, setPoliticas] = useState([]);
      const [nuevaPolitica, setNuevaPolitica] = useState({ titulo: "", detalle: "" });

  const navigate = useNavigate();
  const form = useRef(null);


  const agregarPolitica = () => {
    if (nuevaPolitica.titulo.trim() && nuevaPolitica.detalle.trim()) {
        setPoliticas([...politicas, { id: Date.now(), ...nuevaPolitica }]);
        setNuevaPolitica({ titulo: "", detalle: "" });
    } else {
        mensajeOperacionError("Ambos campos son obligatorios.");
    }
};


const eliminarPolitica = (id) => {
  setPoliticas(politicas.filter((politica) => politica.id !== id));
};



  useEffect(() => {

    const fecthCategorias = () => {
    //  en enpoints publicos, no se envia token
    setAuthHeader(false);

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

      })
      .finally(() => {
        // Limpiar el token después de la solicitud
        clearAuthHeader();
      });
    }

    const fecthCiudades = () => {
      //  en enpoints publicos, no se envia token
      setAuthHeader(false);
  
      //  Carga de ciudades
      setIsLoadingCiudades(true);
      const endpoint = "/ciudades";
      AxiosInstance.get(endpoint)
        .then((res) => {
          setCiudades(res.data);
          setIsLoadingCiudades(false);
          setHayErrorCiudades(false);
        })
        .catch((error) => {
          setCiudades(new Array());
          setIsLoadingCiudades(false);
          setHayErrorCiudades(true);
          setErrorCiudades(error);
  
        })
        .finally(() => {
          // Limpiar el token después de la solicitud
          clearAuthHeader();
        });
      }
  

      fecthCategorias();
      fecthCiudades();


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


  const eliminarIds = (listaConIds) => {
    return listaConIds.map(({ id, ...resto }) => resto);
};



  const guardarImagenes = (idProducto) =>{

    const imagenesRequests = [
      {
        "url": form.current.querySelector("#imagen-1").value,
        "titulo": ""
      },
      {
        "url": form.current.querySelector("#imagen-2").value,
        "titulo": ""
      },
      {
        "url": form.current.querySelector("#imagen-3").value,
        "titulo": ""
      },
      {
        "url": form.current.querySelector("#imagen-4").value,
        "titulo": ""
      },
      {
        "url": form.current.querySelector("#imagen-5").value,
        "titulo": ""
      }
    ]

    const header = {};
    const token = localStorage.getItem("token");
    setAuthHeader(token);

    clearAuthHeader();
    imagenesRequests.forEach((unRequest, index) => {

      // se le agrega el id del producto al que pertenece
      unRequest.producto = {
        id: idProducto
      };

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
          })
        })
        .finally(() => {
          // Limpiar el token después de la solicitud
          clearAuthHeader();
        });;

      // fin del foreach imagenes
    });


  }



  const guardarPoliticas = (idProducto) =>{

    const politicasRequest = eliminarIds(politicas);

    console.log("POLITICAS: ", politicasRequest);

    const header = {};
    const token = localStorage.getItem("token");
    setAuthHeader(token);


    clearAuthHeader();
    politicasRequest.forEach((unRequest, index) => {

      // se le agrega el id del producto al que pertenece
      unRequest.producto = {
        id: idProducto
      };

      setAuthHeader(token);
      AxiosInstance.post(`/politicas`, unRequest, header)
        .then((res) => {


        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            text: 'No se pudo guardar las políticas'
          })
        })
        .finally(() => {
          // Limpiar el token después de la solicitud
          clearAuthHeader();
        });;

      // fin del foreach imagenes
    });


  }



  const submitHandler = (event) => {
    event.preventDefault();

    const endpoint = 'productos';
    const postDataProducto = {
      titulo: form.current.querySelector("#titulo").value,
      descripcion: form.current.querySelector("#descripcion").value,
      categoria: {
        id: form.current.querySelector("#categorias-select").value
      },
      ciudad: {
        id: form.current.querySelector("#ciudades-select").value
      },
      caracteristicas: selectedTags
    };

    const header = {};
    const token = localStorage.getItem("token");
    setAuthHeader(token);

    //post de products
    AxiosInstance.post(`/productos`, postDataProducto, header)
      .then((res) => {

        guardarImagenes(res.data.id);
        guardarPoliticas(res.data.id);

        mensajeOperacionExitosa();
      })
      .catch((error) => {
        
        mensajeOperacionError(error.response.data);
      })
      .finally(() => {
        // Limpiar el token después de la solicitud
        clearAuthHeader();
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
          <div className="mb-4">
                        <h3 className="text-primary">Datos básicos</h3>
                    </div>
                    <hr></hr>

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


            <div className="col-md-6 mb-3">
              <label htmlFor="ciudades" className="form-label text-primary">Ciudad</label>
              {hayErrorCategoria ? (
                <div className="text-danger">Hubo un error al cargar las ciudades.</div>
              ) : (
                <select
                  name="ciudades"
                  id="ciudades-select"
                  className="form-select"
                  required
                  defaultValue="#"
                >
                  <option value="#" disabled>
                    Seleccione una ciudad
                  </option>
                  {ciudades.map((unaCiudad) => (
                    <option
                      key={`ciudad-${unaCiudad.id}`}
                      value={unaCiudad.id}
                    >
                      {unaCiudad.nombre}
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

<div className="mb-4">
    <h3 className="text-primary">Políticas</h3>

</div>
<hr />
<label htmlFor="nombre-politica" className="form-label text-primary">
    Nombre de la política
</label>
<input
    type="text"
    id="nombre-politica"
    className="form-control"
    value={nuevaPolitica.titulo}
    onChange={(e) => setNuevaPolitica({ ...nuevaPolitica, titulo: e.target.value })}
/>
<label htmlFor="detalle-politica" className="form-label text-primary mt-2">
    Detalles
</label>
<textarea
    id="detalle-politica"
    className="form-control"
    rows="3"
    value={nuevaPolitica.detalle}
    onChange={(e) => setNuevaPolitica({ ...nuevaPolitica, detalle: e.target.value })}
></textarea>
<button
    type="button"
    className="btn btn-secondary mt-3"
    onClick={agregarPolitica}
>
    Agregar política
</button>
</div>


<div className="mb-4">
{politicas.map((politica) => (
    <div className="card mb-2" key={politica.id}>
        <div className="card-header">
            {politica.titulo}
        </div>
        <div className="card-body">
            <p className="card-text">{politica.detalle}</p>
            <button
                type="button"
                className="btn btn-danger"
                onClick={() => eliminarPolitica(politica.id)}
            >
                Eliminar
            </button>
        </div>
    </div>
))}
</div>


          <div className="mb-4">
                    <h3 className="text-primary">Características</h3>
                </div>
                <hr />


          <SelectorDeCaracteristicasComponent onTagsChange={setSelectedTags} />
          <div className="mb-4">
                    <h3 className="text-primary">Cargar imágenes</h3>
                </div>
                <hr />
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
