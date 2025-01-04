
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AxiosInstance } from '../../helpers/AxiosHelper';
import { DetalleAlojamientoHeaderComponent } from './DetalleAlojamientoHeaderComponent';

export const DetalleAlojamientoComponent = ({ productId }) => {


  const productoDefault = {
    titulo: "",
    descripcion: "",
    imagenes: []
};

const scrollToTop = () => {
    window.scrollTo(0, 0);
}

const { id } = useParams();
const [ searchParams ] = useSearchParams();
const [producto, setProducto] = useState({ ...productoDefault, id: id ?? productId });


  const endpoint = "/productos/" + producto.id;

  useEffect(() => {


AxiosInstance.get(endpoint)
 .then((res) => {
    console.log(res.data);
    setProducto({...res.data});
  })
  .catch((error) => {
    console.log(error);
    Swal.fire({
      icon: 'error',
      text: 'No se pudo cargar el producto'
    })
  });

}, []);


return (
        <>

           <DetalleAlojamientoHeaderComponent {...producto}/>
        </>
);
};