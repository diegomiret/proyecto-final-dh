import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom';
import { BusquedaAlojamientoCard } from '../../cards/BusquedaAlojamientoCard';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../../helpers/AxiosHelper';

export const AlojamientosPorCategoria = () => {



  const container = useRef(null);

  const { id } = useParams();
  const [idCategoria, setIdCategoria] = useState(id);
  const [productos, setProductos] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [hayError, setHayError] = useState(false);
  const [error, setError] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 5 filas de 2 columnas



  const totalPages = Math.ceil(productos.length / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = productos.slice(startIndex, startIndex + itemsPerPage);


  useEffect(() => {

    //  en enpoints publicos, no se envia token
setAuthHeader(false);

    const endpoint = "/productos/categoria/" + id;
    AxiosInstance.get(endpoint)
      .then((res) => {
        setProductos(res.data);
        setIsLoading(false);
        setHayError(false);
      })
      .catch((error) => {
        setProductos(new Array());
        setIsLoading(false);
        setHayError(true);
        setError(error);
      })
      .finally(() => {
        // Limpiar el token después de la solicitud
        clearAuthHeader();
      });
      
      

    setTimeout(() => {
      var headerOffset = 80;
      var elementPosition = container.current.getBoundingClientRect().top;
      var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }, 500);

  }, [id]);


  return (
    <div className="container mt-4">
       <h2 ref={container}>Resultados</h2>
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
  )
}
