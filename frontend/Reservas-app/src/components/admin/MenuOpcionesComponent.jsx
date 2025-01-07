import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const MenuOpcionesComponent = () => {

  const buttonStyle = {
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#f5f5f5",
  };



  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "20px" }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <Link to={"/administracion/agregarProducto"}>
      <button  >
          Crear Producto
        </button>
        </Link>

        <Link to={"/administracion/listaProductos"}>
      <button  >
          Lista de productos
        </button>
        </Link>
      </nav>
    </div>

  )
}


