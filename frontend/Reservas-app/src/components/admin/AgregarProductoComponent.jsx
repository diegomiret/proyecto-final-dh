import React, { useState } from 'react'
import { FormProductoNuevo } from './FormProductoNuevo';
import { FormBodyStyle, TitleContainer } from './AgregarProductoComponentStyled';
import { AxiosInstance } from '../../helpers/AxiosHelper';
import Swal from 'sweetalert2';

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
        e.preventDefault();
    setErrors({ ...errors, ...validationForm(values) });


    //post de products
    AxiosInstance.post(`/productos`, {
      titulo: values.titulo,
      descripcion: values.descripcion
    })
      // guardado de imagenes
    //   .then((res) => {
    //     values.imagenes.forEach((unaImagen, index) => {
    //       AxiosInstance.post(`/imagenes/agregar`, {
    //         titulo: '',
    //         url: unaImagen,
    //         product: {
    //           id: res.data.id
    //         }
    //       }
    //         )
    //         .then((res) => {
    //           //si la ultima imagen es correcta entonces redirigir a producto exitoso
    //           index === values.urlImages.length - 1 && navigate('producto-exitoso');
    //         })
    //         .catch((error) => {
    //           Swal.fire({
    //             icon: 'error',
    //             text: 'Lamentablemente el producto no ha podido crearse. Por favor intente más tarde'
    //           })
    //         })
    //     })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          text: 'Error al guardar el producto'
        })
      })
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
