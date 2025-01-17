import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../helpers/AxiosHelper';

export const DetalleAlojamientoGaleriaComponent = ({productoId}) => {


  const { id } = useParams();
  const [idProducto, setIdProducto] = useState(id);

  const [imagenes, setImagenes] = useState([]);

useEffect(() => {


//  en enpoints publicos, no se envia token
setAuthHeader(false);
    const endpoint = "/imagenes/imagenesDelProducto/" + idProducto;
    AxiosInstance.get(endpoint)
      .then((res) => {
        setImagenes(res.data);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: 'No se pudo cargar las imágenes'
        });
      })
      .finally(() => {
        // Limpiar el token después de la solicitud
        clearAuthHeader();
      });
      

  }, []);



  return (
    <>
    <div className="container mt-4">
      <div className="row">
        {imagenes.map((imagen, index) => (
          <div className="col-12 col-md-4 p-0" key={index}
          style={{
            padding: "5px", // Espaciado para mostrar las líneas
            borderBottom: "1px solid gray",
            borderRight: (index + 1) % 3 === 0 ? "none" : "1px solid gray", // Sin borde derecho para la última columna
          }}
          >
            <img
              src={imagen.url}
              alt={`Imagen ${index + 1}`}
              className="img-fluid"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </div>
    </div>
  </>
  )
}
