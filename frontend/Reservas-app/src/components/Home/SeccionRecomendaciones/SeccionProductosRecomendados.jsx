import React, { useEffect, useState } from 'react'
import { RecomendacionesAlojamientoCard } from '../../cards/RecomendacionesAlojamientoCard';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../../helpers/AxiosHelper';
import { BusquedaAlojamientoCard } from '../../cards/BusquedaAlojamientoCard';


export const SeccionProductosRecomendados = () => {

 const [productos, setProductos] = useState([]);
   const [isLoading, setIsLoading] = useState(false);
   const [hayError, setHayError] = useState(false);
   const [error, setError] = useState();
 

   useEffect(() => {
 
     setIsLoading(true);
     const endpoint = "/productos/top/4";
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
      <div className="container-fluid mt-4 p-4 border rounded bg-light">
          <h5 className="mb-4">Recomendaciones</h5>
          <div className="row">
            {productos.map((producto, index) => (
              <div className="col-md-3 mb-4" key={index}>
  <BusquedaAlojamientoCard
                            idProducto={producto.id}
                            titulo={producto.titulo}
                            descripcion={producto.descripcion}
                            imagenes={producto.imagenes}
                            categoria={producto.categoria}
                          />
              </div>
            ))}
          </div>
        </div>
  )
}
