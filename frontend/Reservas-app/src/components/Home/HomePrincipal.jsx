import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { BarraBuscadorComponent } from '../BarraBuscadorComponent'
import { RecomendacionesAlojamientosComponent } from '../RecomendacionesAlojamientosComponent'
import { UserContext } from '../../context/UserContext'
import { User } from '../../ReservaHotelesApp'
import { AdministracionComponent } from '../admin/administracionComponent'
import { PanelBusquedaPorCategoriaComponent } from './PanelBusquedaPorCategoria/PanelBusquedaPorCategoriaComponent'
import { SeccionCategoriaComponent } from './SeccionCategorias/SeccionCategoriaComponent'
import { SeccionProductosAleatoriosComponent } from './SeccionProductosAleatorios/SeccionProductosAleatoriosComponent'

export const HomePrincipal = () => {

    const [user, ] = useContext(User);

    return (
        <>
            <BarraBuscadorComponent></BarraBuscadorComponent>
            <SeccionCategoriaComponent></SeccionCategoriaComponent>
            <RecomendacionesAlojamientosComponent></RecomendacionesAlojamientosComponent>

            <Routes>
                {/* El componente que se carga por default es el componente de prod aleatorios */}
                <Route path="/" element={<SeccionProductosAleatoriosComponent />} />

                {/* Aca van los otros componentes de muestra de resultados */}
                {/* <Route path="/productos/categoria/:id" element={<AlojamientosPorCategoria />} /> */}

                <Route path="/productos/categoria/:id" element={<PanelBusquedaPorCategoriaComponent />} />

              

            </Routes>
            

       

        </>
    )
}
