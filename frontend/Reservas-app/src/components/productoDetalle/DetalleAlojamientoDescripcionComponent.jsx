import React from 'react'

export const DetalleAlojamientoDescripcionComponent = ({descripcion}) => {

console.log(descripcion);

  return (
    <main className="mt-4">
    <h4>Descripcion: </h4>
    <p>{descripcion}</p>
  </main>


  )
}
