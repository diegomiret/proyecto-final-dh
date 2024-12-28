import React from 'react'
import './assets/estilos/AlojamientosAleatorios.css';

export const AlojamientosAleatorios = () => {

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
    <div className="alojamientosAleatorios-container">
    <div className="container">
      <div className="row row-cols-2">
        {cards.map((card) => (
          <div className="col mb-4" key={card.id}>
            <div className="card h-100">
              <img src={card.imgSrc} className="card-img-top" alt={card.title} />
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}
