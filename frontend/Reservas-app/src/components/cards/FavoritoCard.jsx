import React, { useEffect, useState } from 'react'
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../helpers/AxiosHelper';
import { useNavigate } from 'react-router-dom';

export const FavoritoCard = ({ favorito, onEliminar })  => {

    const [producto, setProducto] = useState({});
    const navigate = useNavigate();

    useEffect(() => {

        const endpoint = "/productos/" + favorito.idProducto;

        //  en enpoints publicos, no se envia token
        setAuthHeader(false);

        AxiosInstance.get(endpoint)
            .then((res) => {
                setProducto(res.data);
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
                // Limpiar el token después de la solicitud
                clearAuthHeader();
            });
    }, [favorito.idProducto]);


    const handleRedirect = () => {
      navigate("/detalleProducto/" + favorito.idProducto); // Cambia "/destination" por la ruta del componente al que deseas redirigir
    };
  
    if (!producto) {
        return (
          <div className="card">
            <div className="card-body">
              <p className="text-center">Cargando...</p>
            </div>
          </div>
        );
      }

  return (

    <>
<div className="card shadow-sm rounded-3 overflow-hidden" style={{ height: "300px", transition: "box-shadow 0.3s ease", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>

        <div className="card-body d-flex flex-column p-3" style={{ height: 'calc(100% - 70px)', overflow: 'hidden' }}>
          <div className="d-flex">

            <div className="flex-grow-1" style={{ flexBasis: "66.66%" }}>
              <h5 className="card-title text-dark" style={{ fontSize: "18px", fontWeight: 600, color: "#333", marginBottom: "8px" }}>
                {producto.titulo}
              </h5>
            </div>
            <div className="bg-info text-white d-flex justify-content-center align-items-center" style={{ flexBasis: "16.66%" }}>
            </div>

            <div className="favoritoBoton" style={{ flexBasis: "16.66%" }}>

            </div>
          </div>

          <p className="card-text" style={{ fontSize: "14px", textDecoration: "none", color: "#666", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
            {producto.descripcion}
          </p>

          <button
            className="btn btn-primary mt-2"
            style={{ width: '100%' }}
            onClick={handleRedirect}
          >
            Ver más detalles
          </button>


          <button
            className="btn btn-danger mt-2"
            style={{ width: '100%' }}
            onClick={() => onEliminar(favorito.id)}
          >
            Eliminar favorito
          </button>

        </div>
      </div>



    </>
  )
}
