import { useEffect, useState } from "react";
import { PanelFiltroCategoriasComponent } from "./PanelFiltroCategoriasComponent";
import { useParams } from 'react-router-dom';
import { PanelresultadoBusquedaPorCategoriaComponent } from "./PanelresultadoBusquedaPorCategoriaComponent";
import { PanelResultadoBusqueda2Coponent } from "./PanelResultadoBusqueda2Coponent";
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../../helpers/AxiosHelper";

// Componente principal
export const PanelBusquedaPorCategoriaComponent = () => {
  const { id } = useParams();
  const [categorias, setCategorias] = useState([]);

  //    inicializo con el id de categoria de la url
  //    para que empiece buscando esa categoria
  const [filtroIds, setFiltroIds] = useState([parseInt(id)]);

  

  // Llamada inicial para obtener categorías
  useEffect(() => {

   setAuthHeader(false);

    const endpoint = "/categorias";
    AxiosInstance.get(endpoint)
      .then((res) => {
        setCategorias(res.data)
      })
      .catch((error) => {
      })
      .finally(() => {
        // Limpiar el token después de la solicitud
        clearAuthHeader();
      });;

  }, []);

  const handleAplicarFiltro = (ids) => {
      setFiltroIds(ids);
  };

  return (
    <div className="container d-flex">
        <PanelFiltroCategoriasComponent categorias={categorias} idSeleccionado={parseInt(id)} onAplicarFiltro={handleAplicarFiltro} />
        {/* <PanelresultadoBusquedaPorCategoriaComponent filtroIds={filtroIds} /> */}
        <PanelResultadoBusqueda2Coponent ids={filtroIds} />
    </div>
);
};
