import { useEffect, useState } from "react";
import { CategoriaAlojamientoCard } from "../../cards/CategoriaAlojamientoCard"
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../../helpers/AxiosHelper";

export const SeccionCategoriaComponent = () => {


  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hayError, setHayError] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {

    //  en enpoints publicos, no se envia token
    setAuthHeader(false);

    setIsLoading(true);
    const endpoint = "/categorias";
    AxiosInstance.get(endpoint)
      .then((res) => {
        setCategorias(res.data);
        setIsLoading(false);
        setHayError(false);
        console.log(res.data);
      })
      .catch((error) => {
        setCategorias(new Array());
        setIsLoading(false);
        setHayError(true);
        setError(error);

      })
      .finally(() => {
        // Limpiar el token después de la solicitud
        clearAuthHeader();
      });;
    ;

  }, []);


  return (

    <div className="container-fluid mt-4 p-4 border rounded bg-light">
      <h5 className="mb-4">Categorías</h5>

      {isLoading ? <h4>Cargando</h4> : null}
      {hayError ? <h5>Error al cargar</h5> : null}

      <div className="row">
        <div class="card-group"></div>
        {categorias.map((unaCategoria, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <CategoriaAlojamientoCard
              id={unaCategoria.id}
              image={unaCategoria.urlImagen}
              title={unaCategoria.nombre}
              subtitle={unaCategoria.descripcion}
            />
          </div>
        ))}
      </div>
    </div>

  )
}
