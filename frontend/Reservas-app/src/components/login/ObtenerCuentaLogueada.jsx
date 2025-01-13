import { useContext } from "react";
import { AxiosInstance } from "../../helpers/AxiosHelper";
import { User } from "../../ReservaHotelesApp";

export default function ObtenerCuentaLogueada() {

    const [user, setUser] = useContext(User);

    if (!user) {

        const token = localStorage.getItem("token");

        fetch(`http://localhost:8080/usuarios/usuarioActual`, {
            mode: 'cors',
            method: 'GET',
            headers: {
                Authorization: "Bearer " + token,
                Accept: "application/json"
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("RESPUESTA: ", data);
                setUser(data)
            })
            .catch((err) => {
                console.log("ERROR: ", err);
            });



    }

    return <></>
}