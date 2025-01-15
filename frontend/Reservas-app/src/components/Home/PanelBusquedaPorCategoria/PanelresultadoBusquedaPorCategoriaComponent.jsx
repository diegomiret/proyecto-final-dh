import { useEffect, useState } from "react";

export const PanelresultadoBusquedaPorCategoriaComponent = ({ filtroIds }) => {
  const [productos, setProductos] = useState([]);
  
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

  const handleFirstPage = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  useEffect(() => {
      if (filtroIds.length > 0) {
          const fetchProductos = async () => {
              const resultados = await Promise.all(
                  filtroIds.map(id =>
                      fetch(`http://localhost:8080/productos/categoria/${id}`)
                          .then(response => response.json())
                          .catch(error => console.error('Error al cargar productos:', error))
                  )
              );
              setProductos(resultados.flat());
          };
          fetchProductos();
      } else {
          setProductos([]);
      }
  }, [filtroIds]);

  return (
      <div className="container mt-3">
          <div className="row">
              {productos.map(producto => (
                  <div key={producto.id} className="col-md-4 mb-3">
                      <div className="card">
                          <div className="card-body">
                              <h5 className="card-title">{producto.titulo}</h5>
                              <p className="card-text">{producto.descripcion}</p>
                          </div>
                      </div>
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
  );
};