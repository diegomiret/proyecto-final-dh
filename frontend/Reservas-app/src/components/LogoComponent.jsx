import logo from "./assets/imagenes/icono-marca.png"

const LogoComponent = () => {
    return <img src={logo} alt="logo prinicpal" style={{ maxHeight: "50px", marginRight: "0.5rem" }}  />
}

export default LogoComponent;