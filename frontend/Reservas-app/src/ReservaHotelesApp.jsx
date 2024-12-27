import React from 'react'
import { NavBarComponent } from './components/NavBarComponent'
import { HomeComponent } from './components/HomeComponent'
import { Route, Routes } from 'react-router-dom'

export const ReservaHotelesApp = () => {
    return (

        <>
            <NavBarComponent></NavBarComponent>

            <div className='container' style={{ marginTop: '30px' }}>
                <Routes>
                    <Route path='/' element={<HomeComponent />} ></Route>
                    <Route path='/*' element={<HomeComponent />}></Route>
                </Routes>

            </div>

        </>
    )
}
