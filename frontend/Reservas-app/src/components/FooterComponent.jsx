import React from 'react'
import isogotipo from '../assets/imagenes/isogotipo.png'

export const FooterComponent = () => {

    const currentYear = new Date().getFullYear();

  return (
    
    <footer style={{ backgroundColor: '#f1f1f1' }} className="py-3 mt-5">
      <div className="container">
        <div className="row justify-content-between align-items-center">

          <div className="col-12 col-md-6 d-flex align-items-center">
            <img
              src={isogotipo}
              alt="Isologotipo"
              style={{ maxHeight: '50px', marginRight: '10px' }}
            />
            <span style={{ color: '#003b95', fontSize: '14px' }}>
              &copy; {currentYear} My Booking. Todos los derechos reservados.
            </span>
          </div>

      
        </div>
      </div>
    </footer>

  )
}
