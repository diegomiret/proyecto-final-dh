import React, { useContext } from 'react'
import { FavoritoCard } from '../cards/FavoritoCard';
import { FavoritoContext } from '../../context/FavoritoContext';
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../helpers/AxiosHelper';
import Swal from "sweetalert2";

export const MisFavoritosComponent = () => {

    const { favoritos, setFavoritos } = useContext(FavoritoContext);

    const handleEliminarFavorito = (idFavorito) => {

           const endpoint = `/favoritos/${idFavorito}`;
           const token = localStorage.getItem("token");
           setAuthHeader(token);
       

       
           AxiosInstance.delete(endpoint)
             .then((res) => {
            
                const nuevosFavoritos = favoritos.filter((favorito) => favorito.id !== idFavorito);
                setFavoritos(nuevosFavoritos);
                
             })
             .catch((error) => {
               console.error(error);
               Swal.fire({
                 icon: "error",
                 text: "Error al eliminar el favorito.",
               });
             })
             .finally(() => {
               clearAuthHeader();
             });
    };

    return (
      
      <div className="container-fluid mt-4 p-4 border rounded bg-light">
            <h2 className="text-center">Mis Favoritos</h2>
            <div className="row">
                {favoritos.map((favorito) => (
                    <div key={favorito.id} className="col-md-4 col-sm-6 my-2">
                        <FavoritoCard
                            favorito={favorito}
                            onEliminar={handleEliminarFavorito}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
