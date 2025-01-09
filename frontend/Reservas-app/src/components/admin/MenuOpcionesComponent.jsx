import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const MenuOpcionesComponent = () => {

  return (
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "20px" }}>
<nav style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
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


