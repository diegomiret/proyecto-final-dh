import { useEffect, useState } from "react";
import { CategoriaAlojamientoCard } from "./cards/CategoriaAlojamientoCard";
import { AxiosInstance } from "../helpers/AxiosHelper";

export const CategoriasAlojamientoComponent = () => {


  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hayError, setHayError] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {

    setIsLoading(true);
    const endpoint = "/categorias";
    AxiosInstance.get(endpoint)
      .then((res) => {
        setCategorias(res.data);
        setIsLoading(false);
        setHayError(false);
      })
      .catch((error) => {
        setCategorias(new Array());
        setIsLoading(false);
        setHayError(true);
        setError(error);
        
      });

  }, []);


  return (
    
    <div className="container  my-4">
      <h5 className="mb-4">Categorías</h5>

      {isLoading ? <h4>Cargando</h4> : null}
      {hayError ? <h5>Error al cargar</h5> : null}

      <div className="row">
        {categorias.map((unaCategoria, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <CategoriaAlojamientoCard
              id={unaCategoria.id}
              image={unaCategoria.urlImagen} 
              title={unaCategoria.nombre} 
            />
          </div>
        ))}
      </div>
    </div>

  )
}
