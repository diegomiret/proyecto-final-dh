import React, { useState } from 'react'
import { FormProductoNuevo } from './FormProductoNuevo';
import { FormBodyStyle, TitleContainer } from './AgregarProductoComponentStyled';
import { AxiosInstance } from '../../../helpers/AxiosHelper';
import Swal from 'sweetalert2';
import { useFetchData } from '../../hooks/useFetchData';

export const AgregarProductoComponent = () => {

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        titulo: '',
        descripcion: '',
        temporaryImageInput: '',
        imagenes: []
    });
    const [pasaValidaciones, setPasaValidaciones] = useState(true);

    const pasaTodasLasValidaciones = () => {
        let validationErrors = {};
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexNumbers = /^(-?([0-8]?[0-9](\.\d+)?|90(.[0]+)?)\s?)$/;
        let pasaValidaciones = true;

        if (!values.titulo) {
            pasaValidaciones = false;
        } else if (!regexName.test(values.titulo)) {
            pasaValidaciones = false;
        }
        if (!values.descripcion) {
            pasaValidaciones = false;
        }
        if (values.imagenes.length === 0) {
            pasaValidaciones = false;
        }


        return pasaValidaciones;
    }


    // Validaciones del formulario
    const validationForm = () => {
        let validationErrors = {};
        let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
        let regexNumbers = /^(-?([0-8]?[0-9](\.\d+)?|90(.[0]+)?)\s?)$/;
        let pasaValidaciones = true;

        if (!values.titulo) {
            validationErrors.titulo = "Este campo es obligatorio";
        } else if (!regexName.test(values.titulo)) {
            validationErrors.name = "Este campo solo acepta letras";
            pasaValidaciones = false;
        }

        if (!values.descripcion) {
            validationErrors.descripcion = "Este campo es obligatorio.";
            pasaValidaciones = false;
        }


        if (values.imagenes.length === 0) {
            validationErrors.imagenes = "Este campo es obligatorio.";
            pasaValidaciones = false;
        }

        setPasaValidaciones(pasaValidaciones);

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

    const mensajeOperacionExitosa = () => {
        Swal.fire({
            title: '¡Éxito!',
            text: 'La operación se realizó correctamente.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });
    };


    const mensajeOperacionError = (mensaje) => {
        Swal.fire({
            icon: 'error',
            text: mensaje
        });
    };


    const handleSubmit = (e) => {

        e.preventDefault();
        setErrors({ ...errors, ...validationForm() });

        if (!pasaTodasLasValidaciones()) {
            return;
        }

        const endpoint = 'productos';
        const token = '';
        const postDataProducto = {
            titulo: values.titulo,
            descripcion: values.descripcion
        };
        const postDataImagen = {
            titulo: values.titulo,
            descripcion: values.descripcion
        };

        const header = {
            Authorization: `Bearer ${token}`
        }


        //post de products
        AxiosInstance.post(`/productos`, postDataProducto, header)
            .then((res) => {
                values.imagenes.forEach((urlImage, index) => {
                    const postDataImagen = {
                        titulo: '',
                        url: urlImage,
                        producto: {
                            id: res.data.id
                        }
                    };
                    AxiosInstance.post(`/imagenes`, postDataImagen, header)
                        .then((res) => {
                            //si la ultima imagen es correcta entonces redirigir a producto exitoso
                            //index === values.imagenes.length - 1 && navigate('producto-exitoso');
                            console.log("Se guardo la imagen");

                        })
                        .catch((error) => {
                            Swal.fire({
                                icon: 'error',
                                text: 'No se pudo guardar la imagen'
                            })
                        })

                    // fin del foreach imagenes
                });

                mensajeOperacionExitosa();

                //  fin post producto
            })
            .catch((error) => {
                error
                mensajeOperacionError(error.response.data);
            });


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
