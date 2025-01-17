
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../helpers/AxiosHelper';
import { DetalleAlojamientoHeaderComponent } from './DetalleAlojamientoHeaderComponent';
import { DetalleAlojamientoDescripcionComponent } from './DetalleAlojamientoDescripcionComponent';
import { DetalleAlojamientoImagenesComponent } from './DetalleAlojamientoImagenesComponent';
import { DetalleAlojamientoCaracteristicas } from './DetalleAlojamientoCaracteristicas';
import { DetalleAlojamientoCalendarioComponent } from './DetalleAlojamientoCalendarioComponent';

export const DetalleAlojamientoComponent = ({ productId }) => {

  const productoDefault = {
    titulo: "",
    descripcion: "",
    imagenes: [],
    caracteristicas: []
  };


  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [producto, setProducto] = useState({ ...productoDefault, id: id ?? productId });

  const navigate = useNavigate();

  useEffect(() => {

    console.log("Se va a llamar al servicio");

    //  en enpoints publicos, no se envia token
    setAuthHeader(false);

    const endpoint = "/productos/" + producto.id;
    AxiosInstance.get(endpoint)
      .then((res) => {
        setProducto({ ...res.data });
        console.log(res.data.reservas);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: 'No se pudo cargar el producto. Intente mas tarde'
        });
      })
      .finally(() => {
        // Limpiar el token después de la solicitud
        clearAuthHeader();
      });


  }, []);


  const irAGaleria = () => {
    navigate('/galeriaProducto/' + id);
  };


  return (
    <>

    

      <DetalleAlojamientoHeaderComponent {...producto} />
      <div className='container'>

        <DetalleAlojamientoDescripcionComponent {...producto} />

        <DetalleAlojamientoCaracteristicas caracteristicas={producto.caracteristicas} />

        <DetalleAlojamientoImagenesComponent {...producto} />

        <div className="container mt-4">
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={irAGaleria}>Ir a Galería</button>
          </div>
        </div>

        <DetalleAlojamientoCalendarioComponent reservas={producto.reservas || []} />



        

      </div>
    </>
  );
};