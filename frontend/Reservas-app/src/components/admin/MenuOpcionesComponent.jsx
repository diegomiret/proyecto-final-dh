import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const MenuOpcionesComponent = () => {

  return (
<div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", padding: "20px" }}>
<nav style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
      <Link to={"/administracion/agregarProducto"}>
      <button  className="btn btn-primary" >
          Crear producto
        </button>
        </Link>

        <Link to={"/administracion/listaProductos"}>
      <button  className="btn btn-primary">
          Lista de productos
        </button>
        </Link>

        <Link to={"/administracion/asignarCategorias"}>
      <button  className="btn btn-primary">
          Asignar categorias
        </button>
        </Link>

        <Link to={"/administracion/asignarRoles"}>
      <button  className="btn btn-primary">
          Asignar roles
        </button>
        </Link>

        <Link to={"/administracion/adminCaracterisitcas"}>
      <button  className="btn btn-primary">
          Administrar características
        </button>
        </Link>

        <Link to={"/administracion/agregarCategoria"}>
      <button  className="btn btn-primary">
          Agregar categoría
        </button>
        </Link>

        <Link to={"/administracion/eliminarCategorias"}>
      <button  className="btn btn-primary">
          Eliminar categorías
        </button>
        </Link>


      </nav>
    </div>

  )
}


