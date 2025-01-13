import React, { useEffect, useState } from 'react'
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../helpers/AxiosHelper";

export const PerfilComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
     
      const endpoint = "/usuarios/usuarioActual";
      const token = localStorage.getItem("token");

      setAuthHeader(token);

      AxiosInstance.get(endpoint)
        .then((res) => {
          setData(res.data)
        })
        .catch((error) => {

        })
        .finally(() => {
          // Limpiar el token después de la solicitud
          clearAuthHeader();
        });;

    }, []);
  
    if (!data) {
      return <div>Cargando...</div>;
    }
  
    return (
      <div className="container mt-5" style={{ backgroundColor: "rgb(238, 239, 242)", borderRadius: "8px", padding: "30px" }}>
      <h3 className="text-center" style={{ color: "#003b95" }}>Información personal</h3>
      
      <div className="table-responsive">
        <table className="table table-striped" style={{ borderRadius: "10px", overflow: "hidden" }}>
          <thead style={{ backgroundColor: "#003b95", color: "#ffffff" }}>
            <tr>
              <th scope="col">Campo</th>
              <th scope="col">Valor</th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "white" }}>
            <tr>
              <td><strong>ID</strong></td>
              <td>{data.id}</td>
            </tr>
            <tr>
              <td><strong>Nombre</strong></td>
              <td>{data.nombre}</td>
            </tr>
            <tr>
              <td><strong>Apellido</strong></td>
              <td>{data.apellido}</td>
            </tr>
            <tr>
              <td><strong>Email</strong></td>
              <td>{data.email}</td>
            </tr>
            <tr>
              <td><strong>Rol</strong></td>
              <td>{data.role}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    );
  };
  