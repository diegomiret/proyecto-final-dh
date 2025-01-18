import React from 'react'

export const DetalleAlojamientoPoliticasComponent = ({ politicas }) => {


  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">
        Políticas del alojamiento
        <hr className="w-25 mx-auto" />
      </h2>
      
      <div className="row">
        {politicas.map((politica) => (
          <div className="col-md-4 mb-3" key={politica.id}>
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{politica.titulo}</h5>
                <p className="card-text">{politica.detalle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
