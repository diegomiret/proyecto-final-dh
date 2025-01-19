import React, { useEffect, useState } from 'react'
import { ValoracionesPromedioContext } from './ValoracionesPromedioContext'
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../helpers/AxiosHelper';

export const ValoracionesPromedioProvider = ({ children }) => {

    const [valoracionesPromedios, setValoracionesPromedio] = useState([]);

    // Cargar los promedios del los productos
    useEffect(() => {

        const endpoint = "/reviews/promedios";
              const token = localStorage.getItem("token");
              setAuthHeader(false);
        
              AxiosInstance.get(endpoint)
                .then((res) => {
                    setValoracionesPromedio(res.data);
                    console.log(res.data);

                })
                .catch((error) => {
                  console.error(error);
                })
                .finally(() => {
                  clearAuthHeader();
                });

    }, []);
  
    return (
      <ValoracionesPromedioContext.Provider value={{ valoracionesPromedios, setValoracionesPromedio }}>
        {children}
      </ValoracionesPromedioContext.Provider>
    );
  };