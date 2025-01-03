import {NavLink} from 'react-router-dom'
import './assets/estilos/NavBarComponent.css'


export const NavBarComponent = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light sticky-top">
    <div className="container-fluid">
        <NavLink to='/' className="navbar-brand d-flex align-items-center" href="#">
        <img src="" alt="logo prinicpal" style={{ maxHeight: "50px", marginRight: "0.5rem" }}  />
            <span>Aca va el Slogan</span>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarButtons" aria-controls="navbarButtons" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarButtons">
            <div className="d-flex">
                <button className="btn btn-primary me-2">Crear cuenta</button>
                <button className="btn btn-outline-secondary">Iniciar sesión</button>
            </div>
        </div>
    </div>
</nav>


  )
}
