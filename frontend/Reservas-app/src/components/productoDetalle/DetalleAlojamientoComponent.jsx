
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosInstance } from '../../helpers/AxiosHelper';
import { DetalleAlojamientoHeaderComponent } from './DetalleAlojamientoHeaderComponent';
import { DetalleAlojamientoDescripcionComponent } from './DetalleAlojamientoDescripcionComponent';
import { DetalleAlojamientoImagenesComponent } from './DetalleAlojamientoImagenesComponent';

export const DetalleAlojamientoComponent = ({ productId }) => {

  const productoDefault = {
    titulo: "",
    descripcion: "",
    imagenes: []
  };


  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [producto, setProducto] = useState({ ...productoDefault, id: id ?? productId });

  const navigate = useNavigate();

  useEffect(() => {

    const endpoint = "/productos/" + producto.id;
    AxiosInstance.get(endpoint)
      .then((res) => {
        setProducto({ ...res.data });
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: 'No se pudo cargar el producto'
        })
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
        <DetalleAlojamientoImagenesComponent {...producto} />

        <div className="container mt-4">
          <div className="d-flex justify-content-end">
            <button  className="btn btn-primary" onClick={irAGaleria}>Ir a Galería</button>
          </div>
        </div>

      </div>
    </>
  );
};