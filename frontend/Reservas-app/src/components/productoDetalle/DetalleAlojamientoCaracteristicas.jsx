import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { iconList } from "../../helpers/IconHelper";

export const DetalleAlojamientoCaracteristicas = ({ caracteristicas }) => {
  const apiResponse = caracteristicas;

  const formattedOptions = apiResponse.map((item) => {
    const iconEntry = iconList.find((icon) => icon.name === item.icono);
    const Icon = iconEntry ? iconEntry.icon : null;

    return {
      id: item.id,
      name: item.nombre,
      Icon: Icon,
    };
  });

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h4>Características</h4>
          <div className="d-flex flex-wrap">
            {formattedOptions.map((option) => (
              <div
                key={option.id}
                className="d-flex align-items-center mb-3 me-3 p-2 border rounded"
                style={{ width: "auto", minWidth: "150px" }}
              >
                {option.Icon && <option.Icon className="me-2" />}
                <span>{option.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
