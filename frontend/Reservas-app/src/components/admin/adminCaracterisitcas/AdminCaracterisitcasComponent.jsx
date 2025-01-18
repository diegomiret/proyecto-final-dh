import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Icons from "react-icons/fa";
import { AxiosInstance, setAuthHeader, clearAuthHeader } from "../../../helpers/AxiosHelper";
import Swal from "sweetalert2";
import { NuevaCaracteristicaComponent } from "./NuevaCaracteristicaComponent";
import { EditarCaracteristicaComponent } from "./EditarCaracteristicaComponent";

export const AdminCaracterisitcasComponent = () => {
  const [caracteristicas, setCaracteristicas] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [editarId, setEditarId] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerCaracteristicas = () => {
      const endpoint = "/caracteristicas";
      const token = localStorage.getItem("token");
      setAuthHeader(token);

      AxiosInstance.get(endpoint)
        .then((res) => {
          setCaracteristicas(res.data);
        })
        .catch((error) => {
        })
        .finally(() => {
          clearAuthHeader();
        });
    };

    obtenerCaracteristicas();
  }, []);

  const eliminarCaracteristica = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta característica?")) {
      const endpoint = `/caracteristicas/${id}`;
      const token = localStorage.getItem("token");
      setAuthHeader(token);

      AxiosInstance.delete(endpoint)
        .then(() => {
          setCaracteristicas(caracteristicas.filter((item) => item.id !== id));
          Swal.fire({
            title: "¡Éxito!",
            text: "La característica se eliminó correctamente.",
            icon: "success",
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            text: "Error al eliminar la característica.",
          });
        })
        .finally(() => {
          clearAuthHeader();
        });
    }
  };

  const actualizarLista = () => {
    const endpoint = "/caracteristicas";
    const token = localStorage.getItem("token");
    setAuthHeader(token);

    AxiosInstance.get(endpoint)
      .then((res) => {
        setCaracteristicas(res.data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        clearAuthHeader();
      });
  };

  const mostrarFormularioEdicion = () =>{
    setMostrarFormulario(!mostrarFormulario);
    
  }

  return (
    <div className="container py-4" style={{ backgroundColor: "rgb(238, 239, 242)" }}>
      <h4>Administrar características</h4>
      <table className="table table-striped">
        <thead style={{ backgroundColor: "#003b95", color: "white" }}>
          <tr>
            <th>Nombre</th>
            <th>Ícono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {caracteristicas.map((caracteristica) => {
            const IconComponent = Icons[caracteristica.icono] || Icons.FaQuestion;
            return (
              <tr key={caracteristica.id}>
                <td>{caracteristica.nombre}</td>
                <td>
                  <IconComponent size={20} />
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => setEditarId(caracteristica.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminarCaracteristica(caracteristica.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="text-end">
        <button
          className="btn btn-primary"
          // onClick={() => setMostrarFormulario(!mostrarFormulario)}
           onClick={() => mostrarFormularioEdicion()}
        >
          {mostrarFormulario ? "Cancelar" : "Añadir nueva"}
        </button>
      </div>
      {mostrarFormulario && <NuevaCaracteristicaComponent onGuardarExitoso={actualizarLista} />}
      {editarId && (
        <EditarCaracteristicaComponent
          id={editarId}
          onGuardarExitoso={() => {
            actualizarLista();
            setEditarId(null); 
          }}
        />
      )}
    </div>
  );
};
