import React, { createContext, useState } from 'react'
import { NavBarComponent } from './components/NavBarComponent'
import { Route, Routes } from 'react-router-dom'
import { AdministracionComponent } from './components/admin/administracionComponent'
import { DetalleAlojamientoComponent } from './components/productoDetalle/DetalleAlojamientoComponent'
import { DetalleAlojamientoGaleriaComponent } from './components/productoDetalle/DetalleAlojamientoGaleriaComponent'
import { FooterComponent } from './components/FooterComponent'
import { HomePrincipal } from './components/Home/HomePrincipal'
import { EditarProductoComponent } from './components/admin/EditarProducto/EditarProductoComponent'
import { RegistroComponent } from './components/registro/registroComponent'
import { LoginComponent } from './components/login/LoginComponent'
import ObtenerCuentaLogueada from './components/login/ObtenerCuentaLogueada'
import { LogOut } from './components/LogOut/LogOutComponent'
import { PerfilComponent } from './components/perfil/PerfilComponent'


const User = createContext(false);

export const ReservaHotelesApp = () => {

    const [user, setUser] = useState(null);
    return (

        <User.Provider value={[user, setUser]}>          
<ObtenerCuentaLogueada/>
         <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <NavBarComponent></NavBarComponent>
            <div style={{ flex: 1 }}>
                <Routes>
                    <Route path='/' element={<HomePrincipal />} />
                    <Route path='/*' element={<HomePrincipal />}/>
                    <Route path='/administracion/*' element={<AdministracionComponent />}/>
                    <Route path="detalleProducto/:id" element={<DetalleAlojamientoComponent />} />
                    <Route path="galeriaProducto/:id" element={<DetalleAlojamientoGaleriaComponent />} />
                    <Route path="editarProducto/:id" element={<EditarProductoComponent />} />
                    <Route path="/registro" element={<RegistroComponent />} />
                    <Route path="/perfil" element={<PerfilComponent />} />
                    <Route path="login" element={<LoginComponent />} />
                    <Route path="/logout" element={<LogOut />} />
                </Routes>
            </div>

            <FooterComponent></FooterComponent>
            </div>

            </User.Provider>
    )
}
export { User };