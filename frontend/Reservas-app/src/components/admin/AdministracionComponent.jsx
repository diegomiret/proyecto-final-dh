import React, { useState } from 'react'
import { useForm } from '../hooks/useForm'
import { Navigate, useNavigate } from 'react-router-dom';

export const AdministracionComponent = () => {

    const navigate = useNavigate();

    const initialForm =  {
        inputTitulo: '',
        inputDescripcion: ''
    };

    const {inputTitulo, inputDescripcion, onInputChange} = useForm(initialForm);

    const handleSubmit = (event) => {
        event.preventDefault();

        // aca se hace la logica del negocio
        
    }

    const handleRedirect = () =>{
        navigate('/agregarProducto');
    }

    return (


        <>
        <div className='container'>
            <button type="button" className="btn btn-primary" onClick={handleRedirect}>Agregar producto</button>
            </div>
        </>

    )
}
