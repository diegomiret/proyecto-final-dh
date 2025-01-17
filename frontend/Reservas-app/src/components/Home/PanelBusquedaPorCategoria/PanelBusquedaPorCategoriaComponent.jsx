import { useEffect, useState } from "react";
import { PanelFiltroCategoriasComponent } from "./PanelFiltroCategoriasComponent";
import { useParams } from 'react-router-dom';
import { PanelResultadoBusqueda2Coponent } from "./PanelResultadoBusqueda2Coponent";
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../../helpers/AxiosHelper";

// Componente principal
export const PanelBusquedaPorCategoriaComponent = () => {
  const { id } = useParams();
  const [categorias, setCategorias] = useState([]);

  //    inicializo con el id de categoria de la url
  //    para que empiece buscando esa categoria
  const [filtroIds, setFiltroIds] = useState([parseInt(id)]);


  const estilosComponentePanel = {
    width: '300px',
    borderRight: '1px solid #ddd',
  };

  const estilosComponenteResultado = {
    padding: '15px',
  };

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

  }, [id]);

  const handleAplicarFiltro = (ids) => {
      setFiltroIds(ids);
  };

  


  return (
    // <div className="card shadow-sm rounded-3 overflow-hidden">
    //     <PanelFiltroCategoriasComponent categorias={categorias} idSeleccionado={parseInt(id)} onAplicarFiltro={handleAplicarFiltro} />
    
    //     <PanelResultadoBusqueda2Coponent ids={filtroIds} />
    // </div>


<div className="container-fluid mt-4 p-4 border rounded bg-light">
      <div className="d-flex flex-column flex-md-row">
        <div className="ComponentePanel" style={{ flex: '1 1 12.5%' }}>
          <PanelFiltroCategoriasComponent categorias={categorias} idSeleccionado={parseInt(id)} onAplicarFiltro={handleAplicarFiltro} />
        </div>
        <div className="ComponenteResultado" style={{ flex: '1 1 87.5%' }}>
          <PanelResultadoBusqueda2Coponent ids={filtroIds} />
        </div>
      </div>
    </div>
);
};
