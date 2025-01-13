import { useNavigate } from "react-router-dom";
import { User } from "../../ReservaHotelesApp";
import { useContext } from "react";
import Swal from 'sweetalert2';

export const LogOut = () => { 

    localStorage.removeItem('token');

    const [, setUser] = useContext(User);
    const navigate = useNavigate();
    
    setUser(null);


    Swal.fire({
          title: 'Sesión cerrada',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });

    navigate("/");

    return;
 }
