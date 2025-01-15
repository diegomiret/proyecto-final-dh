import React, { useState, useEffect } from "react";
import axios from "axios";
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../../helpers/AxiosHelper";
import Swal from 'sweetalert2';

export const AsignacionRolesComponent = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const roles = ["ADMIN", "USER"];
    
  
    useEffect(() => {



 const token = localStorage.getItem("token");
    setAuthHeader(token);

        const endpoint = "/usuarios/todos";
        AxiosInstance.get(endpoint)
            .then((res) => {            
                setUsers(res.data);
            })
            .catch((error) => {
                
            })
            .finally(() => {
                // Limpiar el token después de la solicitud
                clearAuthHeader();
                setLoading(false);
              });;

    }, []);
  
    const handleRoleChange = (userId, newRole) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
    };



    const mensajeOperacionExitosa = () => {
        Swal.fire({
          title: '¡Éxito!',
          text: 'La operación se realizó correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      };
  
    const saveRole = async (userId, role) => {


 const putDataUpdateRol = {
            role: role
        };

    const token = localStorage.getItem("token");
    setAuthHeader(token);


        const endpoint = "/usuarios/" +userId+"/role";
        AxiosInstance.put(endpoint, putDataUpdateRol)
            .then((res) => {              
                mensajeOperacionExitosa();
            })
            .catch((error) => {
                alert("Error al actualizar el rol");
            })
            .finally(() => {
                // Limpiar el token después de la solicitud
                clearAuthHeader();
              });;



    };
  
    if (loading) {
      return <div className="text-center mt-5">Cargando usuarios...</div>;
    }
  
    return (
        <div className="container py-4" style={{ backgroundColor: '#EEEFF2' }}>
        <h4>Asignar roles</h4>
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.email}</td>
                <td>
                  <select
                    className="form-select"
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    {roles.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => saveRole(user.id, user.role)}
                  >
                    Guardar rol
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
}