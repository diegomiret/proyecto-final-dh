import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../../helpers/AxiosHelper';

export const SeccionCuadroDeBusquedaComponent = () => {
  const navigate = useNavigate();

  const [ciudadIngresada, setCity] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [todasLasCiudades, setTodasLasCiudades] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // En endpoints públicos, no se envía token
    setAuthHeader(false);

    setIsLoading(true);
    const endpoint = "/ciudades";
    AxiosInstance.get(endpoint)
      .then((res) => {
        // Transformar los datos para React-Select
        const options = res.data.map((ciudad) => ({
          value: ciudad.id,
          label: ciudad.nombre,
        }));
        setTodasLasCiudades(options);
      })
      .catch((error) => {
        console.error("Error al cargar las ciudades", error);
      })
      .finally(() => {
        // Limpiar el token después de la solicitud
        clearAuthHeader();
        setIsLoading(false);
      });
  }, []);

  const handleSearch = () => {
    if (!ciudadIngresada) {
      alert("Por favor, selecciona una ciudad.");
      return;
    }

    //  si selecciona una fehca, tiene que estar las dos fechas seleccionadas
    if (!startDate && endDate) {
      alert("Por favor, selecciona ambas fechas.");
      return;
    }
    if (!endDate && startDate) {
      alert("Por favor, selecciona ambas fechas.");
      return;
    }


    var cityId = ciudadIngresada.value;

    var formattedStartDate = "";
    if(startDate){
      formattedStartDate = startDate.toISOString().split('T')[0];
    }else{
      formattedStartDate = null;
    }

    var formattedEndDate = "";
    if(endDate){
      formattedEndDate = endDate.toISOString().split('T')[0];
    }else{
      formattedEndDate = null;
    }

    

    navigate(`/productos/busqueda/${cityId}?fecha_inicio=${formattedStartDate}&fecha_fin=${formattedEndDate}`);
    
  };

  return (
<div className="container-fluid mt-4 p-4 border rounded bg-light">
  <h3 className="mb-4">Buscador de alojamientos</h3>
  <div className="row gy-3 align-items-end">
    <div className="col-12 col-md-6 col-lg-4">
      <label htmlFor="cityInput" className="form-label">
        Ciudad:
      </label>
      <Select
        id="cityInput"
        options={todasLasCiudades}
        value={ciudadIngresada}
        onChange={(selectedOption) => setCity(selectedOption)}
        placeholder="Ingresa una ciudad"
        isLoading={isLoading}
        isClearable
        classNamePrefix="react-select"
      />
    </div>
    <div className="col-6 col-md-3 col-lg-2">
      <div className="d-flex flex-column">
        <label className="form-label">Desde:</label>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          className="form-control"
          placeholderText="Fecha desde"
        />
      </div>
    </div>
    <div className="col-6 col-md-3 col-lg-2">
      <div className="d-flex flex-column">
        <label className="form-label">Hasta:</label>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          className="form-control"
          placeholderText="Fecha hasta"
        />
      </div>
    </div>
    <div className="col-12 col-md-12 col-lg-4">
      <button className="btn btn-primary w-50 mt-3 mt-md-0" onClick={handleSearch}>
        Buscar
      </button>
    </div>
  </div>
</div>
  );
};
