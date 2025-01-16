import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RecomendacionesAlojamientosComponent } from '../RecomendacionesAlojamientosComponent'
import { UserContext } from '../../context/UserContext'
import { User } from '../../ReservaHotelesApp'
import { AdministracionComponent } from '../admin/administracionComponent'
import { PanelBusquedaPorCategoriaComponent } from './PanelBusquedaPorCategoria/PanelBusquedaPorCategoriaComponent'
import { SeccionCategoriaComponent } from './SeccionCategorias/SeccionCategoriaComponent'
import { SeccionProductosAleatoriosComponent } from './SeccionProductosAleatorios/SeccionProductosAleatoriosComponent'
import { SeccionCuadroDeBusquedaComponent } from './SeccionCuadroDeBusqueda/SeccionCuadroDeBusquedaComponent'
import { SeccionProductosRecomendados } from './SeccionRecomendaciones/SeccionProductosRecomendados'
import { PanelBusquedaPrincipalComponent } from './PanelBusquedaPrincipal/PanelBusquedaPrincipalComponent'

export const HomePrincipal = () => {

    const [user, ] = useContext(User);

    return (
        <>
            <SeccionCuadroDeBusquedaComponent></SeccionCuadroDeBusquedaComponent>
            <SeccionCategoriaComponent></SeccionCategoriaComponent>
            <SeccionProductosRecomendados></SeccionProductosRecomendados>

            <Routes>
                {/* El componente que se carga por default es el componente de prod aleatorios */}
                <Route path="/" element={<SeccionProductosAleatoriosComponent />} />

                {/* Aca van los otros componentes de muestra de resultados */}
                <Route path="/productos/categoria/:id" element={<PanelBusquedaPorCategoriaComponent />} />
                <Route path="/productos/busqueda/:idCiudad" element={<PanelBusquedaPrincipalComponent />} />
              

            </Routes>
            

       

        </>
    )
}
