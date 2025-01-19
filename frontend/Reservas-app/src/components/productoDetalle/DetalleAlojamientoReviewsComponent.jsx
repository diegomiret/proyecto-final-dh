import React from 'react'

export const DetalleAlojamientoReviewsComponent = ({ reviews }) => {


    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

  return (
    <div className="container my-4">
    {reviews.map((review) => (
        <div className="card mb-3 w-100" key={review.id}>
            <div className="card-header">
                Puntuación: {review.valoracion}
            </div>
            <div className="card-body">
                <p className="card-text">{review.comentario}</p>
            </div>
            <div className="card-footer d-flex justify-content-between">
                <span>{review.usuario.nombre}</span>
                <span>{formatDate(review.fecha_review)}</span>
            </div>
        </div>
    ))}
</div>
  )
}
