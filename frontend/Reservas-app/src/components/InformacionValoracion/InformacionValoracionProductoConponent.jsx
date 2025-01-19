import React from 'react'

export const InformacionValoracionProductoConponent = ({ promedio, cantidadValoraciones })  => {

// Determinar el color del círculo según el promedio
const getCircleColor = () => {
  if (promedio >= 4) return "bg-success"; // Verde para calificaciones altas
  if (promedio >= 2) return "bg-warning"; // Amarillo para calificaciones m edias
  return "bg-danger"; // Rojo para calificaciones bajas
};

if (cantidadValoraciones === 0) {
  return <div>Aún no recibió valoraciones</div>;
}
  
  return (
    <div className="d-flex align-items-center">
      <span>Calificación: </span>
      <div
        className={`circle d-flex justify-content-center align-items-center ${getCircleColor()}`}
      >
        {promedio.toFixed(1)}
      </div>
      {/* Texto al lado del círculo */}
      <div className="ms-3">
        <span className="ms-2">Recibió {cantidadValoraciones} valoraciones</span>
      </div>
    </div>
  )
}
