import React, { useState, useEffect } from "react";
import { AxiosInstance } from "../../../helpers/AxiosHelper";
import Swal from 'sweetalert2';

export const AsignacionCategoriasComponent = () => {


    const [categories, setCategories] = useState([]);

    const [productos, setProductos] = useState([]);
    const [isLoadingProductos, setIsLoadingProductos] = useState(false);
    const [hayErrorProductos, setHayErrorProductos] = useState(false);
    const [errorProductos, setErrorProductos] = useState();


    const [categorias, setCategorias] = useState([]);
    const [isLoadingCategoria, setIsLoadingCategoria] = useState(false);
    const [hayErrorCategoria, setHayErrorCategoria] = useState(false);
    const [errorCategoria, setErrorCategoria] = useState();


    const [isLoadingGuardarCategoria, setIsLoadingGuardarCategoria] = useState(false);
    const [hayErrorGuardarCategoria, setHayErrorGuardarCategoria] = useState(false);
    const [errorGuardarCategoria, setErrorGuardarCategoria] = useState();



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


    useEffect(() => {

        //  busco los productos
        const fetchProducts = async () => {

            setIsLoadingProductos(true);
            const endpoint = "/productos";
            AxiosInstance.get(endpoint)
                .then((res) => {
                    setProductos(res.data);
                    setIsLoadingProductos(false);
                    setHayErrorProductos(false);
                })
                .catch((error) => {
                    setProductos(new Array());
                    setIsLoadingProductos(false);
                    setHayErrorProductos(true);
                    setErrorProductos(error);

                });

        };

        //  busco los productos
        const fetchCategories = async () => {
            //  Carga de categorias
            setIsLoadingCategoria(true);
            const endpoint = "/categorias";
            AxiosInstance.get(endpoint)
                .then((res) => {
                    setCategorias(res.data);
                    setIsLoadingCategoria(false);
                    setHayErrorCategoria(false);
                    console.log(res.data);
                })
                .catch((error) => {
                    setCategorias(new Array());
                    setIsLoadingCategoria(false);
                    setHayErrorCategoria(true);
                    setErrorCategoria(error);

                });
        }

        fetchProducts();
        fetchCategories();
    }, []);


    // Handle cambio de categoria de un producto
    const handleCategoryChange = (productId, categoryId) => {
        setProductos((prevProducts) =>
            prevProducts.map((product) =>
                product.id === productId ? { ...product, categoria: { ...product.categoria, id: categoryId } } : product
            )
        );
    };

    // guardar la categiria seleccioanda
    const handleSaveCategory = async (productId) => {
        const product = productos.find((p) => p.id === productId);

        const token = '';
        const putDataUpdateCategoria = {
            idProducto: product.id,
           idCategoria: product.categoria.id
          };

          const header = {
            Authorization: `Bearer ${token}`
          };



          
        setIsLoadingGuardarCategoria(true);
        const endpoint = "/productos/actualizar-categoria";
        AxiosInstance.put(endpoint,  putDataUpdateCategoria)
            .then((res) => {
                setIsLoadingGuardarCategoria(false);
                setHayErrorGuardarCategoria(false);
                mensajeOperacionExitosa();
                console.log(res.data);
            })
            .catch((error) => {
                setIsLoadingGuardarCategoria(false);
                setHayErrorGuardarCategoria(true);
                setErrorGuardarCategoria(error);
                mensajeOperacionError(error.response.data);
            });


        
    };

    return (
        <div className="container py-4" style={{ backgroundColor: '#EEEFF2' }}>
            <h4>Asignar categorías</h4>
            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Título</th>
                        <th>Categoría</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((product) => (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>{product.titulo}</td>
                            <td>
                                <select
                                    className="form-control"
                                    value={product.categoria.id}
                                    onChange={(e) => handleCategoryChange(product.id, parseInt(e.target.value))}
                                >
                                    {categorias.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.nombre}
                                        </option>
                                    ))}
                                </select>
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleSaveCategory(product.id)}
                                >
                                    Guardar Categoría
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

