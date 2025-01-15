import React, { useEffect, useRef, useState } from 'react';
import { BusquedaAlojamientoCard } from '../../cards/BusquedaAlojamientoCard';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../../helpers/AxiosHelper';

export const PanelResultadoBusqueda2Coponent = ({ ids }) => {
  const container = useRef(null);
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hayError, setHayError] = useState(false);
  const [error, setError] = useState();
  const [cantidadProductosTotal, setCantidadProductosTotal] = useState(0);


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 5 filas de 2 columnas
  const totalPages = Math.ceil(productos.length / itemsPerPage);

  const handlePreviousPage = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = productos.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    const fetchProductos = async () => {
      setAuthHeader(false); 
      setIsLoading(true);
      setHayError(false);
      setError(null);
      let allProductos = [];

      console.log("ids pasados: ", ids.length);

      try {
        for (const id of ids) {
          const endpoint = `/productos/categoria/${id}`;
          const res = await AxiosInstance.get(endpoint);
          allProductos = [...allProductos, ...res.data];
        }
        setProductos(allProductos);
      } catch (err) {
        setHayError(true);
        setError(err);
      } finally {
        setIsLoading(false);
        clearAuthHeader(); // Limpiar el token después de la solicitud
      }
    };


    const fetchTodosLosProductos = async () => {
      setAuthHeader(false); 
      setIsLoading(true);
      setHayError(false);
      setError(null);
      let allProductos = [];


      try {
          const endpoint = `/productos`;
          const res = await AxiosInstance.get(endpoint);
        setProductos(res.data);
      } catch (err) {
        setHayError(true);
        setError(err);
      } finally {
        setIsLoading(false);
        clearAuthHeader(); // Limpiar el token después de la solicitud
      }
    };


    const fetchCantidadProductos = async () => {
        setAuthHeader(false); 
        try {

            const endpoint = `/productos/cantidadProductos`;
            const res = await AxiosInstance.get(endpoint);
            
            setCantidadProductosTotal(res.data);
        } catch (err) {
          setHayError(true);
          setError(err);
        } finally {
          setIsLoading(false);
          clearAuthHeader(); // Limpiar el token después de la solicitud
        }
      };


      if(ids.length == 0){
        fetchTodosLosProductos();
      }else if(ids.length > 0){
        fetchProductos
      }
    fetchProductos();

    fetchCantidadProductos();

    setTimeout(() => {
      var headerOffset = 80;
      var elementPosition = container.current.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }, 500);
  }, [ids]);

  return (
    <div className="container mt-4">
      <h2 ref={container}>Resultados</h2>
      <hr/>
      <h6>{`Resultados encontrados: ${productos.length}`}</h6>
      {isLoading ? (
        <p>Cargando...</p>
      ) : hayError ? (
        <p>Error: {error?.message}</p>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {currentItems.map((unProducto, index) => (
            <div className="col" key={index}>
              <BusquedaAlojamientoCard
                id={unProducto.id}
                titulo={unProducto.titulo}
                descripcion={unProducto.descripcion}
                imagenes={unProducto.imagenes}
                categoria={unProducto.categoria}
              />
            </div>
          ))}
        </div>
      )}

      <div className="d-flex justify-content-between align-items-center mt-4">
        <button
          className="btn btn-primary"
          onClick={handleFirstPage}
          disabled={currentPage === 1}
        >
          Inicio
        </button>

        <button
          className="btn btn-secondary"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Atrás
        </button>

        <span>
          Página {currentPage} de {totalPages}
        </span>

        <button
          className="btn btn-secondary"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};
