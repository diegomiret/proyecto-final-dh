import { useNavigate } from 'react-router-dom';
import { MenuOpcionesComponent } from './MenuOpcionesComponent';

export const AdministracionComponent = () => {

  const navigate = useNavigate();

  // Check if the user is on a mobile device
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (isMobile) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Este componente no está disponible en dispositivos móviles.</h1>
      </div>
    );
  }




  return (
    <>

      

      <MenuOpcionesComponent></MenuOpcionesComponent>

      

     



    </>

  )


}
