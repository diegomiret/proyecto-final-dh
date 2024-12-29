import React, { useState } from 'react'
import { FormProductoNuevo } from './FormProductoNuevo';
import { FormBodyStyle, TitleContainer } from './AgregarProductoComponentStyled';

export const AgregarProductoComponent = () => {

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        titulo: '',
        descripcion: '',
        temporaryImageInput: '',
        imagenes: [],
    });

    // Validaciones del formulario
    const validationForm = () => {
        let validationErrors = {};
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexNumbers = /^(-?([0-8]?[0-9](\.\d+)?|90(.[0]+)?)\s?)$/;

        if (!values.titulo) {
            validationErrors.titulo = "Este campo es obligatorio"
        } else if (!regexName.test(values.titulo)) {
            validationErrors.name = "Este campo solo acepta letras"
        }

        if (!values.descripcion) {
            validationErrors.descripcion = "Este campo es obligatorio."
        }


        if (values.imagenes.length === 0) {
            validationErrors.imagenes = "Este campo es obligatorio."
        }
        return validationErrors;
    }


    //eventos
    const handleInputChange = (e) => {
        setValues({
            ...values, [e.target.name]: e.target.value,
        })
        setErrors({
            ...errors, [e.target.name]: '',
        })
    }

    const handleAddUrlImage = (e) => {
        e.preventDefault();
        setValues({ ...values, imagenes: [...values.imagenes, values.temporaryImageInput] })
    }


    const handleDeleteUrlImage = (index) => {
        values.imagenes.splice(index, 1);
        setValues({ ...values, imagenes: values.imagenes })
    }



    const handleSubmit = (e) => {
        console.log(e);
    }


    return (
        <>
            <FormBodyStyle>
                <TitleContainer>Alta de alojamiento</TitleContainer>
                <FormProductoNuevo
                    values={values}
                    handleInputChange={handleInputChange}
                    handleSubmit={handleSubmit}
                    errors={errors}
                    handleAddUrlImage={handleAddUrlImage}
                    handleDeleteUrlImage={handleDeleteUrlImage}
                />
            </FormBodyStyle>
        </>

    )
}
