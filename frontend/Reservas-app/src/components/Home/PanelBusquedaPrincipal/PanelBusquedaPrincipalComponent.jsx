import { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from 'react-router-dom';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../../helpers/AxiosHelper";
import { BusquedaAlojamientoCard } from "../../cards/BusquedaAlojamientoCard";

export const PanelBusquedaPrincipalComponent = () => {

    const { id } = useParams();

    const { idCiudad } = useParams();
    const [searchParams] = useSearchParams();


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


    const queryParams = new URLSearchParams({
        fecha_inicio: searchParams.get("fecha_inicio") || "",
        fecha_fin: searchParams.get("fecha_fin") || "",
      });



    const llamarApiCiudadyFechas = () =>{

        setAuthHeader(false);
            setIsLoading(true);
            setHayError(false);
            setError(null);
            const endpoint = `/productos/ciudad-fecha/${idCiudad}?${queryParams}`;
            AxiosInstance.get(endpoint)
                .then((res) => {
                    setProductos(res.data);
                    setIsLoading(false);
                    setHayError(false);
                    setError(null);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setHayError(false);
                    setError(null);

                })
                .finally(() => {
                    // Limpiar el token después de la solicitud
                    clearAuthHeader();
                });
    }


    const llamarApiCiudad = () =>{

        setAuthHeader(false);
            setIsLoading(true);
            setHayError(false);
            setError(null);
            const endpoint = "/productos/ciudad/" + idCiudad;
            AxiosInstance.get(endpoint)
                .then((res) => {
                    setProductos(res.data);
                    setIsLoading(false);
                    setHayError(false);
                    setError(null);
                })
                .catch((error) => {
                    setIsLoading(false);
                    setHayError(false);
                    setError(null);

                })
                .finally(() => {
                    // Limpiar el token después de la solicitud
                    clearAuthHeader();
                });
    }


    useEffect(() => {

        if (searchParams.get("fecha_inicio") == 'null'){
            llamarApiCiudad();
            
        }
        else {
            llamarApiCiudadyFechas();
        }
        

        setTimeout(() => {
            var headerOffset = 80;
            var elementPosition = container.current.getBoundingClientRect().top;
            var offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
            });
        }, 500);
    }, [idCiudad, searchParams]);

    return (
        <div className="container mt-4">
            <h2 ref={container}>Resultados</h2>
            <hr />
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
                                idProducto={unProducto.id}
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
    )
}
