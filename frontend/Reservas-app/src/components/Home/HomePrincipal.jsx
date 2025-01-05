import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AlojamientosAleatorios } from './productosPorCriterio/AlojamientosAleatorios'
import { BarraBuscadorComponent } from '../BarraBuscadorComponent'
import { CategoriasAlojamientoComponent } from '../CategoriasAlojamientoComponent'
import { RecomendacionesAlojamientosComponent } from '../RecomendacionesAlojamientosComponent'
import { AlojamientosPorCategoria } from './productosPorCriterio/AlojamientosPorCategoria'

export const HomePrincipal = () => {
    return (
        <>
            <BarraBuscadorComponent></BarraBuscadorComponent>
            <CategoriasAlojamientoComponent></CategoriasAlojamientoComponent>
            <RecomendacionesAlojamientosComponent></RecomendacionesAlojamientosComponent>

            <Routes>
                {/* El componente que se carga por default es el componente de prod aleatorios */}
                <Route path="/" element={<AlojamientosAleatorios />} />
                <Route path="/*" element={<AlojamientosAleatorios />} />

                {/* Aca van los otros componentes de muestra de resultados */}
                <Route path="/productos/categoria/:id" element={<AlojamientosPorCategoria />} />
            </Routes>



        </>
    )
}
