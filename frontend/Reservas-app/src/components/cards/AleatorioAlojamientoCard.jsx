import React from 'react'
import { Link } from 'react-router-dom'

export const AleatorioAlojamientoCard = ({ id, image, title, subtitle }) => {
  return (

    <>
      <Link to={"/detalleProducto/" + id}>
        <div className="card mb-3" style={{ maxWidth: '100%' }}>
          <div className="row g-0">

            <div className="col-md-6">
              <img
                src={image}
                className="img-fluid rounded-start"
                alt="Card image"
                style={{ height: '100%', objectFit: 'cover' }}
              />
            </div>

            <div className="col-md-6">
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">
                  {subtitle}
                </p>
              </div>
            </div>

          </div>

        </div>
      </Link>


    </>
  )
}
