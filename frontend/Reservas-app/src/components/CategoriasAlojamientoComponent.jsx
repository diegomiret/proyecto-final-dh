import { CategoriaAlojamientoCard } from "./cards/CategoriaAlojamientoCard";

export const CategoriasAlojamientoComponent = () => {

  const categorias = [
    { image: 'https://via.placeholder.com/150', title: 'Categoría 1', subtitle: 'Subtítulo 1' },
    { image: 'https://via.placeholder.com/150', title: 'Categoría 2', subtitle: 'Subtítulo 2' },
    { image: 'https://via.placeholder.com/150', title: 'Categoría 3', subtitle: 'Subtítulo 3' },
    { image: 'https://via.placeholder.com/150', title: 'Categoría 4', subtitle: 'Subtítulo 4' },
    // Agregar más categorías si es necesario
  ];


  return (
    
    <div className="container  my-4">
      <h5 className="mb-4">Categorías</h5>
      <div className="row">
        {categorias.map((categoria, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <CategoriaAlojamientoCard
              image={categoria.image} 
              title={categoria.title} 
              subtitle={categoria.subtitle} 
            />
          </div>
        ))}
      </div>
    </div>

  )
}
