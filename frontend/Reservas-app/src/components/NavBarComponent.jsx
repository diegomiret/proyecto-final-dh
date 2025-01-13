import {NavLink} from 'react-router-dom'
import './assets/estilos/NavBarComponent.css'
import logoMarca from '../assets/imagenes/logo-marca.png'
import { User } from '../ReservaHotelesApp';
import { useContext } from 'react';

export const NavBarComponent = () => {


    const [user, ] = useContext(User);

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
                    <button className="btn btn-warning">Administración</button>
                  </NavLink>
                )}
                <NavLink to="/reservas" className="me-2">
                  <button className="btn btn-success">Reservas</button>
                </NavLink>
               
                <NavLink to="/logout">
                  <button className="btn btn-danger">Cerrar sesión</button>
                </NavLink>
                <div
                  className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center me-2"
                  style={{ width: '40px', height: '40px' }}
                >
                  {getUserInitials(user.nombre, user.apellido)}
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
