import React, { useEffect, useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { iconList } from "../../../helpers/IconHelper";
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../../helpers/AxiosHelper";

export const SelectorDeCaracteristicasComponent = ({ onTagsChange, initialTags = [] }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [tags, setTags] = useState(initialTags);

  useEffect(() => {


const endpoint = "/caracteristicas";
      const token = localStorage.getItem("token");
      setAuthHeader(token);

      AxiosInstance.get(endpoint)
        .then((res) => {
            const apiResponse = res.data;
            
            const formattedOptions = apiResponse.map((item) => {
                const iconEntry = iconList.find((icon) => icon.name === item.icono);
                const Icon = iconEntry ? iconEntry.icon : null;
      
                return {
                  value: item.id,
                  label: (
                    <div className="d-flex align-items-center">
                      {Icon && <Icon className="me-2" />} {item.nombre}
                    </div>
                  ),
                  raw: item,
                };
              });

              setOptions(formattedOptions);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          clearAuthHeader();
        });


  }, []);

  const handleAddTag = (event) => {
    event.preventDefault();
    if (selectedOption && !tags.find((tag) => tag.id === selectedOption.raw.id)) {
        const newTags = [...tags, selectedOption.raw];
      setTags([...tags, selectedOption.raw]);
      onTagsChange(newTags);
    }
  };

  const handleRemoveTag = (id) => {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(tags.filter((tag) => tag.id !== id));
    onTagsChange(newTags);

  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
        <label htmlFor="titulo" className="form-label text-primary">
                            Seleccionar caractetísticas
                        </label>
          <div className="d-flex mb-3">
            <div className="me-2" style={{ width: "100%" }}>
              <Select
                options={options}
                onChange={(selected) => setSelectedOption(selected)}
                placeholder="Selecciona una opción"
              />
            </div>
            <button className="btn btn-primary" onClick={handleAddTag}>
              Agregar
            </button>
          </div>
        </div>

        <div className="col-md-6">
        <label htmlFor="titulo" className="form-label text-primary">
                            Caractetísticas agregadas
                        </label>
          <div className="d-flex flex-wrap">
            {tags.map((tag) => {
              const iconEntry = iconList.find((icon) => icon.name === tag.icono);
              const Icon = iconEntry ? iconEntry.icon : null;

              return (
                <span
                  key={tag.id}
                  className="badge bg-secondary me-2 mb-2 d-flex align-items-center"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleRemoveTag(tag.id)}
                >
                  {Icon && <Icon className="me-2" />} {tag.nombre} &times;
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
