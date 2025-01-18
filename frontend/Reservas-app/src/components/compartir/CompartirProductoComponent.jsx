import React, { useEffect, useState } from 'react'
import { AxiosInstance, clearAuthHeader, setAuthHeader } from '../../helpers/AxiosHelper';
import imagenDefault from "../../assets/imagenes/imagen_default_producto.jpg";

export const CompartirProductoComponent = ({ id }) => {

    const [producto, setProducto] = useState({});
    const [mensaje, setMensaje] = useState('');
    const urlBase = `${window.location.origin}/detalleProducto/${id}`;


    useEffect(() => {

        //  en enpoints publicos, no se envia token
        setAuthHeader(false);

        const endpoint = "/productos/" + id;
        AxiosInstance.get(endpoint)
            .then((res) => {
                setProducto(res.data);
                console.log(res.data);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                // Limpiar el token después de la solicitud
                clearAuthHeader();
            });
    }, [id]);


    const handleShare = (socialNetwork) => {
        const message = mensaje ? `${mensaje} ${urlBase}` : urlBase;
        if (socialNetwork === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(message)}`, '_blank');
        } else if (socialNetwork === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`, '_blank');
        } else if (socialNetwork === 'instagram') {
            alert('Instagram no permite compartir a través de una URL desde el navegador.');
        }
    };


    return (
        <div className="card shadow-sm rounded-3 overflow-hidden" style={{ height: "700px", transition: "box-shadow 0.3s ease", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}>
            <img
                src={producto.imagenes && producto.imagenes.length > 0 ? producto.imagenes[0].url : imagenDefault}
                alt={producto.titulo}
                className="card-img-top"
                style={{ height: "50%", objectFit: "cover" }}
            />
            <div className="card-body d-flex flex-column p-3" style={{ height: 'calc(100% - 70px)', overflow: 'hidden' }}>
                <div className="d-flex">

                    <div className="flex-grow-1" style={{ flexBasis: "66.66%" }}>
                        <h5 className="card-title text-dark" style={{ fontSize: "18px", fontWeight: 600, color: "#333", marginBottom: "8px" }}>
                            {producto.titulo}
                        </h5>
                    </div>

                    <div className="bg-info text-white d-flex justify-content-center align-items-center" style={{ flexBasis: "16.66%" }}>

                    </div>

                    <div className="favoritoBoton" style={{ flexBasis: "16.66%" }}>

                    </div>
                </div>

                <p className="card-text" style={{ fontSize: "14px", textDecoration: "none", color: "#666", overflow: "hidden", textOverflow: "ellipsis", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>
                    {producto.descripcion}
                </p>


                <input
                    type="text"
                    value={urlBase}
                    readOnly
                    className="form-control mb-3"
                    style={{ fontSize: "14px" }}
                />


                <textarea
                    value={mensaje}
                    onChange={(e) => setMensaje(e.target.value)}
                    placeholder="Añade un mensaje personalizado"
                    className="form-control mb-3"
                    rows="3"
                    style={{ fontSize: "14px" }}
                />


                <div className="d-flex justify-content-between">
                    <button onClick={() => handleShare('facebook')} className="btn btn-primary">
                        Compartir en Facebook
                    </button>
                    <button onClick={() => handleShare('twitter')} className="btn btn-info">
                        Compartir en Twitter
                    </button>
                    <button onClick={() => handleShare('instagram')} className="btn btn-danger">
                        Compartir en Instagram
                    </button>
                </div>



            </div>
        </div>
    )
}
