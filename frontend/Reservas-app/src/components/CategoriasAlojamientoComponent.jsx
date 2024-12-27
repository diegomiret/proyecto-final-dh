export const CategoriasAlojamientoComponent = () => {

    const alojamientos = [
        {
          id: 1,
          image: 'https://via.placeholder.com/150',
          title: 'Hotel 1',
          subtitle: 'Subtítulo 1'
        },
        {
          id: 2,
          image: 'https://via.placeholder.com/150',
          title: 'Hotel 2',
          subtitle: 'Subtítulo 2'
        },
        {
          id: 3,
          image: 'https://via.placeholder.com/150',
          title: 'Hotel 3',
          subtitle: 'Subtítulo 3'
        },
        {
          id: 4,
          image: 'https://via.placeholder.com/150',
          title: 'Hotel 4',
          subtitle: 'Subtítulo 4'
        }
      ];


  return (
    
    <div className="container my-4">
              <h5 className="mb-4">Categorías</h5>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {alojamientos.map(alojamiento => (
          <div key={alojamiento.id} className="col">
            <div className="card">
              <img src={alojamiento.image} alt={alojamiento.title} className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{alojamiento.title}</h5>
                <p className="card-text">{alojamiento.subtitle}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

  )
}
