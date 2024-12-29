import React, { useState } from 'react'
import './assets/estilos/AlojamientosAleatorios.css';
import { AleatorioAlojamientoCard } from './cards/AleatorioAlojamientoCard';
import { useFetchData } from './hooks/useFetchData';
import Api from '../services/api';

export const AlojamientosAleatorios = () => {

  const {data, isLoading} = useFetchData('productos/aleatorios');

  // const [productosAleatorios, setProductosAleatorios] = useState([]);

  // const api = new Api();
  // api.getProductosAleatorios().then((result) => {
  //   console.log(result);
  // });

  return (

<>

<div className="container my-4">
  <h5 className="mb-4">Hoteles</h5>
  <div className="row">
    {data.map((producto, index) => (
      <div className="col-md-6 mb-4" key={producto.id}> {/* Cambiamos a 6 para tener dos columnas */}
        <AleatorioAlojamientoCard
          image='https://via.placeholder.com/150'
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
