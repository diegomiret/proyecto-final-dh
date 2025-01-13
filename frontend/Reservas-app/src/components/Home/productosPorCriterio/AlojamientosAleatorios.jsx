import React, { useEffect, useState } from 'react'

import { AleatorioAlojamientoCard } from '../../cards/AleatorioAlojamientoCard';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../../helpers/AxiosHelper';

export const AlojamientosAleatorios = () => {

  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hayError, setHayError] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {

    setIsLoading(true);
    const endpoint = "/productos/aleatorios";
    //  en enpoints publicos, no se envia token
setAuthHeader(false);

    AxiosInstance.get(endpoint)
      .then((res) => {
        setProductos(res.data);
        setIsLoading(false);
        setHayError(false);
      })
      .catch((error) => {
        setProductos([]);
        setIsLoading(false);
        setHayError(true);
        setError(error);

        
      }).finally(() => {
        // Limpiar el token después de la solicitud
        clearAuthHeader();
      });
      

  }, []);


  return (
    <>
      <div className="container my-4">
        <h5 className="mb-4">Algunos de los alojamientos</h5>
        {isLoading ? <h4>Cargando</h4> : null}
        {hayError ? <h5>Error al cargar</h5> : null}
        <div className="row">
     
        {productos.map((producto, index) => (
          <div className="col-md-6 mb-4" key={producto.id}> {/* Cambiamos a 6 para tener dos columnas */}
            <AleatorioAlojamientoCard
              id={producto.id}
              image={producto.imagenes[0].url}
              title={producto.titulo}
              subtitle={producto.descripcion}
            />
          </div>
        ))}
        
        </div>
      </div>

    </>

  )
}
