import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AxiosInstance } from '../../helpers/AxiosHelper';
import Swal from 'sweetalert2';

export const RegistroComponent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!/^[a-zA-Z]+$/.test(formData.firstName)) {
      newErrors.firstName = 'El nombre solo debe contener letras.';
    }

    if (!/^[a-zA-Z]+$/.test(formData.lastName)) {
      newErrors.lastName = 'El apellido solo debe contener letras.';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El correo electrónico no tiene un formato válido.';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log('Formulario enviado:', formData);
      
      
      const token = '';
      const header = {
          Authorization: `Bearer ${token}`
        };
  
      const apiPayload = {
          nombre: formData.firstName,
          apellido: formData.lastName,
          email: formData.email,
          password: formData.password,
          estado: false,
          rol: {
            id: 1,
          },
        };
  
        AxiosInstance.post(`/usuarios`, apiPayload, header)
   .then((res) => {
          console.log(res);
          mensajeOperacionExitosa(res.data);
  
          //  fin post producto
        })
        .catch((error) => {
          error
          mensajeOperacionError(error.response.data);
        });
  

    }
  };



  const mensajeOperacionExitosa = (mensaje) => {
      Swal.fire({
        title: '¡Éxito!',
        text: mensaje,
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



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    
  };

  return (
    <div style={{ backgroundColor: 'rgb(238, 239, 242)', minHeight: '100vh', padding: '20px' }}>
      <div className="container">
        
        <div className="card mx-auto mt-4" style={{ maxWidth: '400px' }}>
        <h4 className="text-center mb-4">Crear cuenta</h4>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  name="firstName"
                  className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Apellido</label>
                <input
                  type="text"
                  name="lastName"
                  className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                  value={formData.lastName}
                  onChange={handleChange}
                />
                {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input
                  type="email"
                  name="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  name="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Repetir Contraseña</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>

              <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#0d6efd' }}>
                Crear cuenta
              </button>
            </form>

            <div className="text-center mt-3">
              <a href="/login" className="text-decoration-none">
                ¿Ya tienes cuenta? Inicia sesión
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
