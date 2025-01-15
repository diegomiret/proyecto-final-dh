import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const MenuOpcionesComponent = () => {

  return (
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "20px" }}>
<nav style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <Link to={"/administracion/agregarProducto"}>
      <button  >
          Crear producto
        </button>
        </Link>

        <Link to={"/administracion/listaProductos"}>
      <button  >
          Lista de productos
        </button>
        </Link>

        <Link to={"/administracion/asignarCategorias"}>
      <button  >
          Asignar categorias
        </button>
        </Link>

        <Link to={"/administracion/asignarRoles"}>
      <button  >
          Asignar roles
        </button>
        </Link>

        <Link to={"/administracion/adminCaracterisitcas"}>
      <button  >
          Administrar características
        </button>
        </Link>

        <Link to={"/administracion/agregarCategoria"}>
      <button  >
          Agregar categoría
        </button>
        </Link>



      </nav>
    </div>

  )
}


