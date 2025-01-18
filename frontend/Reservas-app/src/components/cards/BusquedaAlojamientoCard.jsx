import React, { useContext } from 'react';
import { Link, Navigate, NavLink } from 'react-router-dom';
import imagenDefault from "../../assets/imagenes/imagen_default_producto.jpg";
import styled from "styled-components";
import { User } from '../../ReservaHotelesApp';
import { FavoritoContext } from '../../context/FavoritoContext';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../helpers/AxiosHelper';
import Swal from "sweetalert2";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const BusquedaAlojamientoCard = ({ idProducto, titulo, descripcion, imagenes, categoria }) => {

  const [user] = useContext(User);
  const { favoritos, setFavoritos } = useContext(FavoritoContext);

  const navigate = useNavigate();

  const esFavorito = favoritos.some(favorito => favorito.idProducto === idProducto);

  const obtenerIdFavorito = () => {
    const objetoEncontrado = favoritos.find(item => item.idProducto === idProducto);
    return objetoEncontrado ? objetoEncontrado.id : null;
  };

  const eliminarFavoritoBackend = () => {
    const endpoint = `/favoritos/${obtenerIdFavorito()}`;
    const token = localStorage.getItem("token");
    setAuthHeader(token);

    AxiosInstance.delete(endpoint)
      .then((res) => {
        
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          text: "Error al eliminar el favorito.",
        });
      })
      .finally(() => {
        clearAuthHeader();
      });
  };

  const agregarFavoritoBackend = () => {
    const endpoint = "/favoritos";
    const token = localStorage.getItem("token");

    const header = {};
    setAuthHeader(token);

    const request = {
      idProducto: idProducto,
      idUsuario: user.id
    };

    AxiosInstance.post(endpoint, request, header)
      .then((res) => {
        setFavoritos(prev => [
          ...prev,
          { id: res.data.id, idProducto: idProducto, idUsuario: user.id },
        ]);
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          text: "Error al guardar el favorito.",
        });
      })
      .finally(() => {
        clearAuthHeader();
      });
  };

  const handleToggleFavorito = async () => {
    if (!user) return; // Si no hay usuario, no hacer nada

    if (esFavorito) {
      eliminarFavoritoBackend();
      setFavoritos(prev => prev.filter(favorito => favorito.idProducto !== idProducto));
    } else {
      agregarFavoritoBackend();
    }
  };


  const handleRedirect = () => {
    navigate("/detalleProducto/" + idProducto); 
  };

  return (
    <>
      <div className="card shadow-sm rounded-3 overflow-hidden" style={{ height: "450px", transition: "box-shadow 0.3s ease", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
        <img
          src={imagenes[0]?.url || imagenDefault}
          alt={titulo}
          className="card-img-top"
          style={{ height: "50%", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column p-3" style={{ height: 'calc(100% - 70px)', overflow: 'hidden' }}>
          <div className="d-flex">

            <div className="flex-grow-1" style={{ flexBasis: "66.66%" }}>
              <h5 className="card-title text-dark" style={{ fontSize: "18px", fontWeight: 600, color: "#333", marginBottom: "8px" }}>
                {titulo}
              </h5>
            </div>


            <div className="bg-info text-white d-flex justify-content-center align-items-center" style={{ flexBasis: "16.66%" }}>

            </div>

            <div className="favoritoBoton" style={{ flexBasis: "16.66%" }}>
              {user && (
                <CorazonButton onClick={handleToggleFavorito}>
                  {esFavorito ? <FaHeart color="red" /> : <FaRegHeart color="black" />}
                </CorazonButton>
              )}
            </div>
          </div>

          <p className="card-text" style={{ fontSize: "14px", textDecoration: "none", color: "#666", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
            {descripcion}
          </p>

    
          <button
            className="btn btn-primary mt-2"
            style={{ width: '100%' }}
            onClick={handleRedirect}
          >
            Ver más detalles
          </button>

        </div>
      </div>
    </>
  );
};

const CorazonButton = styled.button`
  font-size: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
`;
