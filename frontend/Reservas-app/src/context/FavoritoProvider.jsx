import React, { useEffect, useState } from 'react'
import { FavoritoContext } from './FavoritoContext'
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../helpers/AxiosHelper';

export const FavoritoProvider = ({ children, usuario }) => {

    const [favoritos, setFavoritos] = useState([]);

    // Cargar los favoritos del usuario al inicio
    useEffect(() => {
      if (usuario) {

        const endpoint = "/favoritos/usuario/" + usuario.id;
              const token = localStorage.getItem("token");
              setAuthHeader(token);
        
              AxiosInstance.get(endpoint)
                .then((res) => {
                    setFavoritos(res.data);
                    console.log(res.data);
                })
                .catch((error) => {
                  console.error(error);
                })
                .finally(() => {
                  clearAuthHeader();
                });

      } else {
        setFavoritos([]); // limpio favoritos si no hay usuario
      }
    }, [usuario]);
  
    return (
      <FavoritoContext.Provider value={{ favoritos, setFavoritos }}>
        {children}
      </FavoritoContext.Provider>
    );
  };