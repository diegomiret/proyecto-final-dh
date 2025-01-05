import React from 'react'

export const AleatorioAlojamientoCard = ({ image, title, subtitle }) => {
  return (

<>



  <div className="card mb-3" style={{ maxWidth: '100%' }}>
      <div className="row g-0">

        <div className="col-md-6">
          <img
            src={image} 
            className="img-fluid rounded-start"
            alt="Card image"
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">
             {subtitle}
            </p>
          </div>
        </div>
        
      </div>
      
    </div>


  </>
  )
}
