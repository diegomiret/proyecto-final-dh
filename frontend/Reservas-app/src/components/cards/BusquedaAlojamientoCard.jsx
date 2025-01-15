import React from 'react'
import { Link } from 'react-router-dom'
import imagenDefault from "../../assets/imagenes/imagen_default_producto.jpg";


export const BusquedaAlojamientoCard = ({ id, titulo, descripcion, imagenes, categoria }) => {
 
 
  const cardStyle = {
    height: "300px",
    transition: "box-shadow 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  };

  const cardHoverStyle = {
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
  };

  const imageStyle = {
    height: "50%",
    objectFit: "cover",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: 600,
    color: "#333",
    marginBottom: "8px",
  };

  const titleHoverStyle = {
    color: "#007bff",
  };

  const textStyle = {
    fontSize: "14px",
    color: "#666",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  };
 
  return (

    <>

      <Link to={"/detalleProducto/" + id}>
        {/* <div className="card mb-3" style={{ maxWidth: '540px'}}>
          <div className="row no-gutters">
            <div className="col-md-4">
              <img src={imagenes[0].url} className="img-fluid rounded-start" alt={titulo} />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{titulo}</h5>
                <p className="card-text">{descripcion}</p>
                <p className="card-text"><small className="text-muted">{categoria.nombre}</small></p>
              </div>
            </div>
          </div>
        </div> */}


  <div
        className="card shadow-sm rounded-3 overflow-hidden h-100"
        style={cardStyle}
      >
        <img
          src={imagenes[0].url || imagenDefault}
          alt={titulo}
          className="card-img-top"
          style={imageStyle}
        />
        <div className="card-body d-flex flex-column justify-content-between p-3">
          <h5
            className="card-title text-dark"
            style={titleStyle}
          >
            {titulo}
          </h5>
          <p className="card-text" style={textStyle}>
            {descripcion}
          </p>
        </div>
      </div>


      </Link>


    </>

  )
}
