import React from 'react'
import { BarraBuscadorComponent } from './BarraBuscadorComponent'
import { CategoriasAlojamientoComponent } from './CategoriasAlojamientoComponent'
import { RecomendacionesAlojamientosComponent } from './RecomendacionesAlojamientosComponent'

export const HomeComponent = () => {
    return (
        <>
            <BarraBuscadorComponent></BarraBuscadorComponent>
            <CategoriasAlojamientoComponent></CategoriasAlojamientoComponent>
            <RecomendacionesAlojamientosComponent></RecomendacionesAlojamientosComponent>

        </>
    )
}
