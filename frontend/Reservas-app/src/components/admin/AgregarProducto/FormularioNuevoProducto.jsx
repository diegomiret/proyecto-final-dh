import React, { useState, useEffect, useRef } from "react";
import Api from "../../../services/api";
import { AiOutlineLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import styledComponents from "styled-components";
import { AxiosInstance } from "../../../helpers/AxiosHelper";

const FormularioNuevoProducto = (props) => {
  const [categorias, setCategorias] = useState([]);
  const [isLoadingCategoria, setIsLoadingCategoria] = useState(false);
  const [hayErrorCategoria, setHayErrorCategoria] = useState(false);
  const [errorCategoria, setErrorCategoria] = useState();

  const navigate = useNavigate();
  const form = useRef(null);

  useEffect(() => {

    //  Carga de categorias
    setIsLoadingCategoria(true);
    const endpoint = "/categorias";
    AxiosInstance.get(endpoint)
      .then((res) => {
        console.log(res);
        setCategorias(res.data);
        setIsLoadingCategoria(false);
        setHayErrorCategoria(false);
      })
      .catch((error) => {
        setCategorias(new Array());
        setIsLoadingCategoria(false);
        setHayErrorCategoria(true);
        setErrorCategoria(error);

        console.log(error);

      });
  }, []);



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
  


  const submitHandler = (event) => {
    event.preventDefault();

    const endpoint = 'productos';
    const token = '';
    const postDataProducto = {
      titulo: form.current.querySelector("#titulo").value,
      descripcion: form.current.querySelector("#descripcion").value,
      categoria: {
        id: form.current.querySelector("#categorias-select").value
      }
    };

    const header = {
      Authorization: `Bearer ${token}`
    };

    const imagenesRequests = [
        {
          "url": form.current.querySelector("#imagen-1").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-2").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-3").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-4").value,
          "titulo": "Imagen"
        },
        {
          "url": form.current.querySelector("#imagen-5").value,
          "titulo": "Imagen"
        }
      
    ]

    //post de products
    AxiosInstance.post(`/productos`, postDataProducto, header)
      .then((res) => {
        imagenesRequests.forEach((unRequest, index) => {
          
          // se le agrega el id del producto al que pertenece
          unRequest.producto = {
            id: res.data.id
          };
          
          AxiosInstance.post(`/imagenes`, unRequest, header)
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

  };

  return (
    <>
      <Header>
        <div>
          <p>Nuevo Alojamiento</p>
          <h2>Administración</h2>
        </div>
        <BackLink>
          <Link to={"/"}> <AiOutlineLeft /> </Link>
        </BackLink>
      </Header>

      <Container>
        <Titulo><h2>Crear Propiedad</h2></Titulo>
        <FormGroup ref={form} onSubmit={submitHandler} className="form-control">
          <Grupo>
            <Columna>
              <Label htmlFor="titulo">Título</Label>
              <Input
                type="text"
                name="titulo"
                id="titulo"
                className="form-control"
                placeholder="Título"
                required
              />
            </Columna>

            <Columna>
              <Label htmlFor="categorias">Categoría</Label>

              {hayErrorCategoria ? (
                <div style={{ color: 'red' }}>Hubo un error al cargar las categorias.</div>
              ) : (


                <Select name="categorias" id="categorias-select" required>
                  <option value="#" disabled selected>
                    Seleccione una categoría
                  </option>
                  {categorias.map((unaCategoria) => {
                    return (
                      <option key={`categoria-${unaCategoria.id}`} value={`${unaCategoria.id}`}>
                        {unaCategoria.nombre}
                      </option>
                    );
                  })}
                </Select>
              )}
            </Columna>
          </Grupo>



          <Columna>
            <Label htmlFor="descripcion">Descripción</Label>
            <textarea
              name="descripcion"
              id="descripcion"
              cols="30"
              rows="10"
              required
              maxLength={500}
            ></textarea>
          </Columna>




          <Titulo><h3>Cargar imágenes</h3></Titulo>

          <Grupo>
            <Columna>
              {Array.from(Array(5).keys()).map((key) => {
                return <Input className="input-imagen" type="text" key={key} name={"imagen-" + (key + 1)} id={"imagen-" + (key + 1)} placeholder="Inserte la URL de la imagen" required />
              })}
            </Columna>
          </Grupo>

          <Button type="submit">Crear</Button>

        </FormGroup>
      </Container>
    </>
  );
};

const Input = styledComponents.input`
    background-color: #fff;
    border-radius: 5px;
    border: none;
    box-shadow: var(--input-shadow);
    height: 40px;
    padding-left: 18px;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 1rem;
    color: var(--colorPrincipal);
    &[type="checkbox"] {
      font: inherit;
      color: currentColor;
      width: 1.15em;
      height: 1.15em;
      border: 0.15em solid currentColor;
      border-radius: 0.15em;
      transform: translateY(-0.075em);
    }
    &.input-imagen {
      margin-bottom: 1rem;
    }
    `;

const Select = styledComponents.select`    
    background-color: #fff;
    border-radius: 5px;
    border: none;
    box-shadow: var(--input-shadow);
    height: 40px;
    padding-left: 18px;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 1rem;
    color: var(--colorPrincipal);
    & option {
      font-weight: 500;
      color: var(--colorPrincipal);
      padding: 0.5rem;
    }
    `;

const FormGroup = styledComponents.form`
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    padding: 2rem 1rem;
    background-color: #fafafa;
    border-radius: 8px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    h4 {
      font-size: 1.25rem;
      font-weight: 500;
      color: var(--colorPrincipal);
      padding-bottom: 1rem;
    }
    h3 {
      padding-left: 1rem;
    }
    `;

const Label = styledComponents.label`
    text-align: left;
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 1rem;
    color: var(--colorPrincipal);
    `;

const Button = styledComponents.button`
    height:40px;
    width:164px;
    margin-right:10px;
    margin-left: 1rem;
    background-color:var(--color-primary);
    border:none;
    color:var(--contrast--light);
    border-radius:5px;
    font-size:16px;
    font-weight:bold;
    cursor:pointer;
    `;

const Grupo = styledComponents.div`
display: flex;
justify-content: space-between;
padding-bottom: 2rem;
@media only screen and (max-width: 768px) {
  flex-direction: column;
}
`

const Container = styledComponents.div`
padding: 2rem;
background-color: #EEEFF2;
textarea {
  resize: none;
  background-color: #fff;
  border-radius: 5px;
  border: none;
  box-shadow: var(--input-shadow);
  padding-top: 18px;
  padding-left: 18px;
  margin-bottom: 5px;
  font-weight: 500;
  font-size: 1rem;
  color: var(--colorPrincipal);
  width: 100%;
}
.btn-agregar {
  align-self: end;
  margin-bottom: 5px;
}
`

const Header = styledComponents.div`
background-color: var(--colorTerciario);
background-size: cover;
background-position: center;
box-shadow: inset 0px 4px 4px 0px #00000040;
color: var(--colorCuarto);
text-align: left;
display: flex;
justify-content: space-between;
padding: 1rem 2rem 0;
@media only screen and (max-width: 425px) {
    background-size: initial;
}
h2 {
    font-size: 1.5rem;
}
p {
    font-size: 0.875rem;
}
`

const BackLink = styledComponents.div`
a {
    font-size: 48px;
    color: var(--colorCuarto)
    text-decoration: none;
}
`

const Titulo = styledComponents.div`
font-size: 1.25rem;
color: var(--colorPrincipal);
text-align: left;
padding: 1rem 0;
`

const Columna = styledComponents.div`
display: flex;
flex-direction: column;
width: 100%;
padding: 0 1rem;
`

const Check = styledComponents.div`
width: 30%;
display: flex;
justify-content: space-between;
padding-bottom: 0.75rem;
`

const CheckboxGroup = styledComponents.div`
display: flex;
justify-content: space-between;
flex-wrap: wrap;
padding: 0 1rem 1rem 1rem;
`

export default FormularioNuevoProducto;
