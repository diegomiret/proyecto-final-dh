import { useEffect, useState } from "react";

export const PanelFiltroCategoriasComponent = ({ categorias, idSeleccionado, onAplicarFiltro }) => {
    const [seleccionados, setSeleccionados] = useState([]);



    useEffect(() => {
        if (idSeleccionado) {
            setSeleccionados([idSeleccionado]);
        }


      

    }, [idSeleccionado]);

    const handleCheckboxChange = (categoriaId) => {
        setSeleccionados(prev =>
            prev.includes(categoriaId)
                ? prev.filter(id => id !== categoriaId)
                : [...prev, categoriaId]
        );
    };

    const handleAplicarFiltro = () => {

        onAplicarFiltro(seleccionados);
    };

    return (
        <div className="p-3" style={{ backgroundColor: '#54709b', width: '300px' }}>
            <h4 className="text-white">Filtrar por Categoría</h4>
            <form>
                {categorias.map(categoria => (
                    <div key={categoria.id} className="form-check">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id={`categoria-${categoria.id}`}
                            value={categoria.id} 
                            checked={seleccionados.includes(categoria.id)}
                            onChange={() => handleCheckboxChange(categoria.id)}
                        />
                        <label htmlFor={`categoria-${categoria.id}`} className="form-check-label text-white">
                        {`${categoria.nombre} | ${categoria.cantidad}`}
                        </label>
                    </div>
                ))}
            </form>
            <button className="btn btn-primary mt-3" onClick={handleAplicarFiltro}>Aplicar filtro</button>
        </div>
    );
};