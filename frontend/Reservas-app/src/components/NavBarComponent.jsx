import { NavLink } from 'react-router-dom'
import './assets/estilos/NavBarComponent.css'
import logoMarca from '../assets/imagenes/logo-marca.png'
import { User } from '../ReservaHotelesApp';
import { useContext } from 'react';
import { FaRegHeart } from 'react-icons/fa';

export const NavBarComponent = () => {


  const [user,] = useContext(User);

  
  const styles = {
    corazonButton: {
      fontSize: "2rem",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem", // Espacio entre el ícono y el texto
      transition: "color 0.3s ease",
    },
  };

  const getUserInitials = (nombre, apellido) => {
    if (!nombre || !apellido) return '';
    return `${nombre.charAt(0)}${apellido.charAt(0)}`.toUpperCase();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={logoMarca}
            alt="logo principal"
            style={{ maxHeight: '50px', marginRight: '0.5rem' }}
          />
          <span>Reservá tu siguiente destino</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarButtons"
          aria-controls="navbarButtons"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarButtons">
        <div className="d-flex align-items-center">
  {user ? (
    <>
      {user.role === 'ADMIN' && (
        <NavLink to="/administracion" className="me-2">
          <button className="btn btn-primary">Administración</button>
        </NavLink>
      )}
      <NavLink to="/reservas" className="me-2">
        <button className="btn btn-primary">Reservas</button>
      </NavLink>

      {/* Boton Favoritos  */}
      <NavLink to="/misFavoritos" className="me-2">
      <button className="btn btn-primary"  ><FaRegHeart color="white" /> Favoritos</button>
      </NavLink>

      {/* Línea de separación  */}
      <div
        className="vr mx-3"
        style={{
          borderLeft: '1px solid #dee2e6',
          height: '40px',
        }}
      ></div>

      <div className="d-flex flex-column align-items-center me-2">
        <NavLink to="/perfil" className="me-2">
          <div
            className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center mb-2"
            style={{ width: '40px', height: '40px' }}
          >
            {getUserInitials(user.nombre, user.apellido)}
          </div>
        </NavLink>
        <NavLink to="/logout" className="text-decoration-none">
          <p className="m-0 text-white">Cerrar sesión</p>
        </NavLink>
      </div>
    </>
  ) : (
    <>
      <NavLink to="/registro" className="me-2">
        <button className="btn btn-primary">Crear cuenta</button>
      </NavLink>
      <NavLink to="/login">
        <button className="btn btn-primary">Iniciar sesión</button>
      </NavLink>
    </>
  )}
</div>
        </div>
      </div>
    </nav>

  )
}
