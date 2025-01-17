import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../helpers/AxiosHelper";
import Swal from 'sweetalert2';
import { User } from "../../ReservaHotelesApp";

export const LoginComponent = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const [, setUser] = useContext(User);

    //const {user} = useContext(UserContext)


    const mensajeOperacionError = (mensaje) => {
        Swal.fire({
            icon: 'error',
            text: mensaje
        });
    };


    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);

        const header = {};

        const user = {
            email: email,
            password: password
        }

        //  en enpoints publicos, no se envia token
        setAuthHeader(false);

        AxiosInstance.post(`/auth/login`, user, header)
            .then((res) => {

                localStorage.setItem("token", res.data.token);
                // seteo el contexto
                setUser(false);

                // redirecciono al home
                navigate("/");
            })
            .catch((error) => {

                if (error.status == 403) {
                    mensajeOperacionError("Las credenciales no son correctas");
                }
            })

            .finally(() => {
                // Limpiar el token después de la solicitud
                clearAuthHeader();
            });

    };

    return (
        <div className="container vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: "rgb(238, 239, 242)" }}>
            <div className="card p-4" style={{ width: "100%", maxWidth: "400px", backgroundColor: "#fff" }}>
                <h4 className="text-center mb-4">Iniciar sesión</h4>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Correo Electrónico
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: "#0d6efd" }}>
                        Iniciar Sesión
                    </button>
                </form>
                <div className="text-center mt-3">
                    <a href="/registro" className="text-decoration-none" style={{ color: "#0d6efd" }}>
                        Crear Cuenta
                    </a>
                </div>
            </div>
        </div>
    );
};
