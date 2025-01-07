import React from 'react'
import { Link } from 'react-router-dom'

export const BusquedaAlojamientoCard = ({ id, titulo, descripcion, imagenes, categoria }) => {
  return (

    <>

      <Link to={"/detalleProducto/" + id}>
        <div className="card mb-3" style={{ maxWidth: '540px' }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img src={imagenes[0].url} className="img-fluid rounded-start" alt={titulo} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{descripcion}</h6>
                <p className="card-text">{categoria.nombre}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>

    </>

  )
}
