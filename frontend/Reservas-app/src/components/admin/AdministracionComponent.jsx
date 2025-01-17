import { Route, Routes, useNavigate } from 'react-router-dom';
import { MenuOpcionesComponent } from './MenuOpcionesComponent';
import FormularioNuevoProducto from './AgregarProducto/FormularioNuevoProducto';
import { ListaProductosComponent } from './ListaProductos/ListaProductosComponent';
import { AsignacionCategoriasComponent } from './AsignacionCategorias/AsignacionCategoriasComponent';
import { AsignacionRolesComponent } from './AsignacionRoles/AsignacionrolesComponent';
import { AdminCaracterisitcasComponent } from './adminCaracterisitcas/AdminCaracterisitcasComponent';
import { SelectorDeCaracteristicasComponent } from './AgregarProducto/SelectorDeCaracteristicasComponent';
import { AgregarCategoriaComponent } from './AgregarCategoria/AgregarCategoriaComponent';
import { EliminarCategorias } from './EliminarCategorias/EliminarCategorias';


export const AdministracionComponent = () => {

  const navigate = useNavigate();

  // Check if the user is on a mobile device
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  if (isMobile) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Este componente no está disponible en dispositivos móviles.</h1>
      </div>
    );
  }

  return (
    <>
      <div className='container'>
        <MenuOpcionesComponent></MenuOpcionesComponent>


        <div style={{ padding: "20px" }}>
          <Routes>
            <Route path="/" element={<div></div>} />
            <Route path="agregarProducto" element={<FormularioNuevoProducto />} />
            <Route path="listaProductos" element={<ListaProductosComponent />} />
            <Route path="asignarCategorias" element={<AsignacionCategoriasComponent />} />
            <Route path="asignarRoles" element={<AsignacionRolesComponent />} />
            <Route path="adminCaracterisitcas" element={<AdminCaracterisitcasComponent />} />
            <Route path="agregarCategoria" element={<AgregarCategoriaComponent />} />
            <Route path="eliminarCategorias" element={<EliminarCategorias />} />
          </Routes>
        </div>
      </div>
    </>

  )


}
