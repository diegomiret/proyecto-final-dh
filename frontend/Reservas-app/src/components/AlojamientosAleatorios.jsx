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


    const cards = [
        { title: 'Card 1', subtitle: 'Subtítulo 1', imgSrc: 'https://via.placeholder.com/150' },
        { title: 'Card 2', subtitle: 'Subtítulo 2', imgSrc: 'https://via.placeholder.com/150' },
        { title: 'Card 3', subtitle: 'Subtítulo 3', imgSrc: 'https://via.placeholder.com/150' },
        { title: 'Card 4', subtitle: 'Subtítulo 4', imgSrc: 'https://via.placeholder.com/150' },
        { title: 'Card 5', subtitle: 'Subtítulo 5', imgSrc: 'https://via.placeholder.com/150' },
        { title: 'Card 6', subtitle: 'Subtítulo 6', imgSrc: 'https://via.placeholder.com/150' },
        { title: 'Card 7', subtitle: 'Subtítulo 7', imgSrc: 'https://via.placeholder.com/150' },
        { title: 'Card 8', subtitle: 'Subtítulo 8', imgSrc: 'https://via.placeholder.com/150' },
        { title: 'Card 9', subtitle: 'Subtítulo 9', imgSrc: 'https://via.placeholder.com/150' },
        { title: 'Card 10', subtitle: 'Subtítulo 10', imgSrc: 'https://via.placeholder.com/150' },
      ];
    

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
