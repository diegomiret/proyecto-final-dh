import { useContext } from "react";
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../helpers/AxiosHelper";
import { User } from "../../ReservaHotelesApp";

export default function ObtenerCuentaLogueada() {

    const [user, setUser] = useContext(User);

    if (!user) {

        const endpoint = "/usuarios/usuarioActual";
        const token = localStorage.getItem("token");

        setAuthHeader(token);

        AxiosInstance.get(endpoint)
          .then((res) => {
            setUser(res.data)
          })
          .catch((error) => {

            
          })
          .finally(() => {
            // Limpiar el token después de la solicitud
            clearAuthHeader();
          });;


    }

    return <></>
}