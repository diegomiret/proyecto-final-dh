import React, { useState } from "react";
import Swal from "sweetalert2";
import { AxiosInstance, setAuthHeader, clearAuthHeader } from "../../../helpers/AxiosHelper";
import { iconList } from "../../../helpers/IconHelper";

export const NuevaCaracteristicaComponent = ({ onGuardarExitoso }) => {
  const [nombre, setNombre] = useState("");
  const [icono, setIcono] = useState("");

  const guardarCaracteristica = () => {
    if (!nombre || !icono) {
      Swal.fire({
        icon: "error",
        text: "Por favor, complete todos los campos.",
      });
      return;
    }

    const endpoint = "/caracteristicas";
    const token = localStorage.getItem("token");
    setAuthHeader(token);

    AxiosInstance.post(endpoint, { nombre, icono })
      .then((res) => {
        Swal.fire({
          title: "¡Éxito!",
          text: "La característica se agregó correctamente.",
          icon: "success",
        });
        onGuardarExitoso();
        setNombre("");
        setIcono("");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          text: "Error al guardar la característica.",
        });
      })
      .finally(() => {
        clearAuthHeader();
      });
  };

  return (
    <div className="mt-4 p-3 bg-light border rounded">
      <h5>Añadir Nueva Característica</h5>
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
            const IconComponent = item.icon;
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
      <button className="btn btn-primary" onClick={guardarCaracteristica}>
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
