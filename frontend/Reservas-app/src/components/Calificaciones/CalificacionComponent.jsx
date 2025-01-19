import React, { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { AxiosInstance, clearAuthHeader, setAuthHeader } from "../../helpers/AxiosHelper";
import Swal from "sweetalert2";
import { User } from "../../ReservaHotelesApp";

export const CalificacionComponent = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [user,] = useContext(User);

    const handleStarClick = (starIndex) => {
        setRating(starIndex);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async () => {
        if (rating === 0) {
            alert("Por favor, califique el alojamiento y deje un comentario.");
            return;
        }

        setIsSubmitting(true);

        const endpoint = "/reviews";
        const token = localStorage.getItem("token");
        setAuthHeader(token);

        // const request = {
        //     producto: {
        //         id: Number(id)
        //     },
        //     usuario: {
        //         id: user.id
        //     },
        //     valoracion: rating,
        //     comentario: comment,
        //     fecha_review: new Date().toISOString().split('T')[0]
        // }


        const request = {
            
            productoId: Number(id),
            usuarioId: user.id,
            valoracion: rating,
            comentario: comment,
            fechaReview: new Date().toISOString().split('T')[0]
        }


        console.log(request);
        AxiosInstance.post(endpoint, request)
            .then((res) => {
                //mostrar pop up
                Swal.fire({
                    title: "¡Éxito!",
                    text: "La reseña se envió correctamente.",
                    icon: "success",
                });

                navigate(`/product/${id}`);
            })
            .catch((error) => {
                console.error(error);
            })
            .finally(() => {
                clearAuthHeader();
                setIsSubmitting(false);
            });


    };

    const renderStars = () => {
        let stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className="star"
                    onClick={() => handleStarClick(i)}
                    style={{
                        cursor: "pointer",
                        color: i <= rating ? "gold" : "gray",
                        fontSize: "2rem",
                    }}
                >
                    <FaStar />
                </span>
            );
        }
        return stars;
    };

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">Escribe una reseña para el alojamiento</h2>
            <div className="row justify-content-center">
                <div className="col-12 col-md-8">
                    <div className="card p-4 shadow-sm">
                        <h4>Calificación</h4>
                        <div className="mb-3">
                            {renderStars()}
                            <h5>{rating} de 5 estrellas</h5>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="comment" className="form-label">
                                Comentario:
                            </label>
                            <textarea
                                id="comment"
                                className="form-control"
                                rows="4"
                                value={comment}
                                onChange={handleCommentChange}
                                placeholder="Escribe tu comentario aquí..."
                            ></textarea>
                        </div>
                        <button
                            className="btn btn-primary w-100"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Enviando..." : "Agregar reseña"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
