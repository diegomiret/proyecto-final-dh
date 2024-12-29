import React from 'react'
import { NavBarComponent } from './components/NavBarComponent'
import { HomeComponent } from './components/HomeComponent'
import { Route, Routes } from 'react-router-dom'
import { AdministracionComponent } from './components/admin/administracionComponent'
import { AgregarProductoComponent } from './components/admin/AgregarProductoComponent'


export const ReservaHotelesApp = () => {
    return (

        <>
            <NavBarComponent></NavBarComponent>

            <div className='container' style={{ marginTop: '30px' }}>
                <Routes>
                    <Route path='/' element={<HomeComponent />} ></Route>
                    <Route path='/admin' element={<AdministracionComponent/>}></Route>
                    <Route path='/*' element={<HomeComponent />}></Route>
                    <Route path="/agregarProducto" element={<AgregarProductoComponent />} />
                </Routes>

            </div>

        </>
    )
}
