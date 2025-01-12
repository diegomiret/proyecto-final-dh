import React, { useState, useEffect } from 'react';
import { AxiosInstance } from '../../../helpers/AxiosHelper';
import Swal from 'sweetalert2';
import { Link, Navigate } from 'react-router-dom';

export const ListaProductosComponent = () => {



  const [productos, setProductos] = useState([]);
  const [isLoadingProductos, setIsLoadingProductos] = useState(false);
  const [hayErrorProductos, setHayErrorProductos] = useState(false);
  const [errorProductos, setErrorProductos] = useState();

  const [isLoadingProductosEliminar, setIsLoadingProductosEliminar] = useState(false);
  const [hayErrorProductosEliminar, setHayErrorProductosEliminar] = useState(false);
  const [errorProductosEliminar, setErrorProductosEliminar] = useState();

  useEffect(() => {

    setIsLoadingProductos(true);
    const endpoint = "/productos";
    AxiosInstance.get(endpoint)
      .then((res) => {
        setProductos(res.data);
        setIsLoadingProductos(false);
        setHayErrorProductos(false);
      })
      .catch((error) => {
        setProductos(new Array());
        setIsLoadingProductos(false);
        setHayErrorProductos(true);
        setErrorProductos(error);

      });

  }, []);



  const mensajeOperacionError = (mensaje) => {
    Swal.fire({
      icon: 'error',
      text: mensaje
    });
  };

  const deleteProduct = (productId) => {
    const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este producto?');

    if (confirmDelete) {
      setIsLoadingProductosEliminar(true);
      const endpoint = "/productos/" + productId;
      AxiosInstance.delete(endpoint)
        .then((res) => {
          setIsLoadingProductosEliminar(false);
          setHayErrorProductosEliminar(false);
          setProductos(prevProducts => prevProducts.filter(product => product.id !== productId));
        })
        .catch((error) => {
          setProductos(new Array());
          setIsLoadingProductosEliminar(false);
          setHayErrorProductosEliminar(true);
          setErrorProductosEliminar(error);
          mensajeOperacionError(error.response.data);

        });

    }
  };


  const editarProducto = (productId) =>{
    Navigate(`/editarProducto/${productId}`);
  }

  return (
    <div className="container py-4" style={{ backgroundColor: '#EEEFF2' }}>
      <h4>Lista de productos</h4>

      {hayErrorProductos ? (
        <div style={{ color: 'red' }}>Hubo un error al cargar los productos.</div>
      ) : (

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.titulo}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(product.id)}
                    style={{ marginRight: "10px" }}
                  >
                    Eliminar producto
                  </button>

                  <Link to={"/editarProducto/" + product.id}>
                  <button
                    className="btn btn-primary"                   
                  >
                    Editar producto
                  </button>
                  </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

    </div>
  );
};

