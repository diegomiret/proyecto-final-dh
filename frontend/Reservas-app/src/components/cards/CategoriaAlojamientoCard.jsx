import React from 'react'
import { Link } from 'react-router-dom'

export const CategoriaAlojamientoCard = ({id, image, title, subtitle }) => {
  return (

    <>
    <Link to={"/productos/categoria/" + id}>
    <div className="card">
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{subtitle}</p>
      </div>
    </div>
    </Link>

    

        </>

  )
}
