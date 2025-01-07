import React from 'react'
import { NavBarComponent } from './components/NavBarComponent'
import { Route, Routes } from 'react-router-dom'
import { AdministracionComponent } from './components/admin/administracionComponent'
import { AgregarProductoComponent } from './components/admin/AgregarProducto/AgregarProductoComponent'
import { DetalleAlojamientoComponent } from './components/productoDetalle/DetalleAlojamientoComponent'
import { DetalleAlojamientoGaleriaComponent } from './components/productoDetalle/DetalleAlojamientoGaleriaComponent'
import { FooterComponent } from './components/FooterComponent'
import { HomePrincipal } from './components/Home/HomePrincipal'
import FormularioNuevoProducto from './components/admin/AgregarProducto/FormularioNuevoProducto'
import { ListaProductosComponent } from './components/admin/ListaProductos/ListaProductosComponent'


export const ReservaHotelesApp = () => {
    return (

        <>
         <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBarComponent></NavBarComponent>
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path='/' element={<HomePrincipal />} />
                    <Route path='/*' element={<HomePrincipal />}/>
                    <Route path='/administracion' element={<AdministracionComponent />}/>
                    <Route path='/administracion/agregarProducto' element={<FormularioNuevoProducto />}/>
                    <Route path='/administracion/listaProductos' element={<ListaProductosComponent />}/>


                    <Route path="detalleProducto/:id" element={<DetalleAlojamientoComponent />} />
                    <Route path="galeriaProducto/:id" element={<DetalleAlojamientoGaleriaComponent />} />
                </Routes>
            </div>

            <FooterComponent></FooterComponent>
            </div>
        </>
    )
}
