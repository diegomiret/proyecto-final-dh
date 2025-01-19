
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../helpers/AxiosHelper';
import { DetalleAlojamientoHeaderComponent } from './DetalleAlojamientoHeaderComponent';
import { DetalleAlojamientoDescripcionComponent } from './DetalleAlojamientoDescripcionComponent';
import { DetalleAlojamientoImagenesComponent } from './DetalleAlojamientoImagenesComponent';
import { DetalleAlojamientoCaracteristicas } from './DetalleAlojamientoCaracteristicas';
import { DetalleAlojamientoCalendarioComponent } from './DetalleAlojamientoCalendarioComponent';
import { DetalleAlojamientoPoliticasComponent } from './DetalleAlojamientoPoliticasComponent';
import { DetalleAlojamientoReviewsComponent } from './DetalleAlojamientoReviewsComponent';
import { FaShareAlt } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { CompartirProductoComponent } from '../compartir/CompartirProductoComponent';
import { InformacionValoracionProductoConponent } from '../InformacionValoracion/InformacionValoracionProductoConponent';
import { ValoracionesPromedioContext } from '../../context/ValoracionesPromedioContext';

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
  const [showModal, setShowModal] = useState(false);

  const { valoracionesPromedios, setValoracionesPromedio } = useContext(ValoracionesPromedioContext);


  const navigate = useNavigate();

  useEffect(() => {

    //  en enpoints publicos, no se envia token
    setAuthHeader(false);

    const endpoint = "/productos/" + producto.id;
    AxiosInstance.get(endpoint)
      .then((res) => {
        setProducto({ ...res.data });
        console.log("ANALIZANDO: ",res.data);
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

  const abrirModalCompartir = () => {
    setShowModal(true);
  };

  const cerrarModalCompartir = () => {
    setShowModal(false);
  };

  const valoracionActual = valoracionesPromedios.find((valoracion) => valoracion.idProducto === Number(id));
  const promedio = valoracionActual ? valoracionActual.promedio : 0.0;
  const cantidadValoraciones = valoracionActual ? valoracionActual.cantidadValoraciones : 0;



  return (
    <>
      <DetalleAlojamientoHeaderComponent {...producto} />

    

      <div className="container-fluid mt-4 p-4 border rounded bg-light">

      <div className="text-left mb-4">
     <FaShareAlt size={32} onClick={abrirModalCompartir} style={{ cursor: 'pointer' }} />
      </div>
      
      <InformacionValoracionProductoConponent
          promedio={promedio}
          cantidadValoraciones={cantidadValoraciones}
        />

        <DetalleAlojamientoDescripcionComponent {...producto} />
        <DetalleAlojamientoCaracteristicas caracteristicas={producto.caracteristicas} />
        <DetalleAlojamientoImagenesComponent {...producto} />
        <div className="container mt-4">
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={irAGaleria}>Ir a Galería</button>
          </div>
        </div>
        <DetalleAlojamientoCalendarioComponent reservas={producto.reservas || []} />
        <DetalleAlojamientoPoliticasComponent politicas={producto.politicas || []}></DetalleAlojamientoPoliticasComponent>
        <DetalleAlojamientoReviewsComponent reviews={producto.reviews || []} ></DetalleAlojamientoReviewsComponent>

      </div>


      <Modal show={showModal} onHide={cerrarModalCompartir} centered>
        <Modal.Header closeButton>
          <Modal.Title>Compartir Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CompartirProductoComponent id={id} />
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={cerrarModalCompartir}>Cerrar</button>
        </Modal.Footer>
      </Modal>


    </>
  );
};