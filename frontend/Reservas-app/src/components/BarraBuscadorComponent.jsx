import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const BarraBuscadorComponent = () => {


    const [city, setCity] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
  

    const handleSearch = () => {
        console.log(`ciudad: ${city}, desde: ${startDate}, hasta: ${endDate}`);
        // aca va a logica de la busquedaa
      };


  return (
    

    <div className="container mt-4 p-4 border rounded bg-light">
      <h3 className="mb-4">Buscador de alojamientos</h3>
      <div className="d-flex align-items-end gap-3">
        <div className="flex-grow-1">
          <label htmlFor="cityInput" className="form-label">
            Ciudad: 
          </label>
          <input
            type="text"
            id="cityInput"
            className="form-control"
            placeholder="Ingresa una ciudad"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label className="form-label">Desde: </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="form-control"
            placeholderText="Fecha desde"
          />
        </div>
        <div>
          <label className="form-label">Hasta: </label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="form-control"
            placeholderText="Fecha hasta"
          />
        </div>
        <button className="btn btn-primary mt-4" onClick={handleSearch}>
          Buscar
        </button>
      </div>
    </div>
    

  )
}
