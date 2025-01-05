import React from 'react'
import { BarraBuscadorComponent } from './BarraBuscadorComponent'
import { CategoriasAlojamientoComponent } from './CategoriasAlojamientoComponent'
import { RecomendacionesAlojamientosComponent } from './RecomendacionesAlojamientosComponent'
import { AlojamientosAleatorios } from './Home/productosPorCriterio/AlojamientosAleatorios'



export const HomeComponent = () => {


    return (
        <>
            <BarraBuscadorComponent></BarraBuscadorComponent>
            <CategoriasAlojamientoComponent></CategoriasAlojamientoComponent>
            <RecomendacionesAlojamientosComponent></RecomendacionesAlojamientosComponent>
            <AlojamientosAleatorios></AlojamientosAleatorios>

        </>
    )
}
