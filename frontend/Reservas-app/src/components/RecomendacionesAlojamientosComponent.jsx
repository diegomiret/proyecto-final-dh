import React from 'react'

export const RecomendacionesAlojamientosComponent = () => {


    const recomendaciones = [
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
    <div className="container my-4">
      <h5 className="mb-4">Recomendados</h5>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {recomendaciones.map(recomendacion => (
          <div key={recomendacion.id} className="col">
            <div className="card">
              <img src={recomendacion.image} alt={recomendacion.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{recomendacion.title}</h5>
                <p className="card-text">{recomendacion.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
