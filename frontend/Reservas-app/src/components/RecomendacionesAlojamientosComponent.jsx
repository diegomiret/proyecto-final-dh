import React from 'react'
import { RecomendacionesAlojamientoCard } from './cards/RecomendacionesAlojamientoCard';

export const RecomendacionesAlojamientosComponent = () => {


    const categorias = [
        {
          id: 1,
          image: 'https://via.placeholder.com/150',
          title: 'Recomendación 1',
          subtitle: 'Subtítulo 1'
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/150',
          title: 'Recomendación 2',
          subtitle: 'Subtítulo 2'
        },
        {
          id: 3,
          image: 'https://via.placeholder.com/150',
          title: 'Recomendación 3',
          subtitle: 'Subtítulo 3'
        },
        {
          id: 4,
          image: 'https://via.placeholder.com/150',
          title: 'Recomendación 4',
          subtitle: 'Subtítulo 4'
        }
      ];

    
    
  return (
      <div className="container  my-4">
          <h5 className="mb-4">Recomendaciones</h5>
          <div className="row">
            {categorias.map((categoria, index) => (
              <div className="col-md-3 mb-4" key={index}>
                <RecomendacionesAlojamientoCard
                  image={categoria.image} 
                  title={categoria.title} 
                  subtitle={categoria.subtitle} 
                />
              </div>
            ))}
          </div>
        </div>
  )
}
