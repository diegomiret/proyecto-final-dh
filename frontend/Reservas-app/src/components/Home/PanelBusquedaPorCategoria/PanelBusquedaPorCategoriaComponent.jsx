import { useEffect, useState } from "react";
import { PanelFiltroCategoriasComponent } from "./PanelFiltroCategoriasComponent";
import { useParams } from 'react-router-dom';
import { PanelresultadoBusquedaPorCategoriaComponent } from "./PanelresultadoBusquedaPorCategoriaComponent";
import { PanelResultadoBusqueda2Coponent } from "./PanelResultadoBusqueda2Coponent";

// Componente principal
export const PanelBusquedaPorCategoriaComponent = () => {
  const { id } = useParams();
  const [categorias, setCategorias] = useState([]);
  const [filtroIds, setFiltroIds] = useState([]);

  // Llamada inicial para obtener categorías
  useEffect(() => {
      fetch('http://localhost:8080/categorias')
          .then(response => response.json())
          .then(data => setCategorias(data))
          .catch(error => console.error('Error al cargar categorías:', error));
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
