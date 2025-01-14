import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AxiosInstance, setAuthHeader, clearAuthHeader } from "../../../helpers/AxiosHelper";
import { iconList } from "../../../helpers/IconHelper";
import * as Icons from "react-icons/fa"; 

export const EditarCaracteristicaComponent = ({ id, onGuardarExitoso }) => {
  const [nombre, setNombre] = useState("");
  const [icono, setIcono] = useState("");
  const [loading, setLoading] = useState(true);

  // Obtener la característica a editar desde la API
  useEffect(() => {
    const obtenerCaracteristica = () => {
      const endpoint = `/caracteristicas/${id}`;
      const token = localStorage.getItem("token");
      setAuthHeader(token);

      AxiosInstance.get(endpoint)
        .then((res) => {
          const { nombre, icono } = res.data;
          setNombre(nombre);
          setIcono(icono);
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            icon: "error",
            text: "Error al obtener los datos de la característica.",
          });
        })
        .finally(() => {
          setLoading(false);
          clearAuthHeader();
        });
    };

    obtenerCaracteristica();
  }, [id]);

  // Guardar cambios
  const guardarCambios = () => {
    if (!nombre || !icono) {
      Swal.fire({
        icon: "error",
        text: "Por favor, complete todos los campos.",
      });
      return;
    }

    const endpoint = `/caracteristicas/${id}`;
    const token = localStorage.getItem("token");
    setAuthHeader(token);

    AxiosInstance.put(endpoint, { nombre, icono })
      .then((res) => {
        Swal.fire({
          title: "¡Éxito!",
          text: "La característica se actualizó correctamente.",
          icon: "success",
        });
        onGuardarExitoso(); // Actualizar lista en el componente padre
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          text: "Error al guardar los cambios.",
        });
      })
      .finally(() => {
        clearAuthHeader();
      });
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="mt-4 p-3 bg-light border rounded">
      <h5>Editar Característica</h5>
      <div className="mb-3">
        <label htmlFor="nombre" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="mb-3">
            <label className="form-label">Seleccionar Ícono</label>
            <div style={styles.iconGrid}>
              {iconList.map((item) => {
                const IconComponent = item.icon; // Referencia al componente del ícono
                return (
                  <div
                    key={item.name}
                    style={{
                      ...styles.iconContainer,
                      border: icono === item.name ? "2px solid #007bff" : "2px solid transparent",
                    }}
                    onClick={() => setIcono(item.name)}
                  >
                    <IconComponent size={24} />
                  </div>
                );
              })}
            </div>
          </div>
      <button className="btn btn-primary" onClick={guardarCambios}>
        Guardar
      </button>
    </div>
  );
};



const styles = {
    iconGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
      gap: "5px", 
    },
    iconContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50px", 
      height: "50px",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: "#f8f9fa",
      transition: "border 0.3s",
    },
  };
  