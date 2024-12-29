import React from 'react'
import { useForm } from '../hooks/useForm'

export const AgregarProductoComponent = () => {


     const initialForm =  {
            inputTitulo: '',
            inputDescripcion: ''
        };
    
        const {inputTitulo, inputDescripcion, onInputChange} = useForm(initialForm);
    
        const handleSubmit = (event) => {
            event.preventDefault();
    
            // aca se hace la logica del negocio
            
        }

  return (
    <>
       
            <h4>Alta de producto</h4>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="inputTitulo" className="form-label">Título</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputTitulo"
                        name="inputTitulo"
                        value={inputTitulo}
                        onChange={onInputChange}
                    />

                </div>

                <div className="mb-3">
                    <label htmlFor="inputDescripcion" className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        id="inputDescripcion"
                        name="inputDescripcion"
                        value={inputDescripcion}
                        onChange={onInputChange}
                    />
                </div>




                <div className="mb-3">
                    <label htmlFor="formFile" className="form-label">Imágenes</label>
                    <input className="form-control" type="file" id="formFile" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>


        </>

  )
}
