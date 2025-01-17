import React from 'react'
import { Link } from 'react-router-dom'
import imagenDefault from "../../assets/imagenes/imagen_default_producto.jpg";


export const CategoriaAlojamientoCard = ({ id, image, title, subtitle }) => {

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

console.log(subtitle);

  return (

    <>
<Link to={`/productos/categoria/${id}`} className="text-decoration-none">
  <div
    className="card shadow-sm rounded-3 overflow-hidden"
    style={cardStyle}
  >
    <img
      src={image || imagenDefault}
      alt={title}
      className="card-img-top"
      style={imageStyle}
    />
    <div className="card-body flex-column p-3" style={{ height: 'calc(100% - 70px)', overflow: 'hidden' }}>
      <h5 className="card-title text-dark" style={titleStyle}>
        {title}
      </h5>
      <p className="card-text" style={textStyle}>
        {subtitle}
      </p>
    </div>
  </div>
</Link>
    </>
  )

}
