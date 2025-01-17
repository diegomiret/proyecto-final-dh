import Calendar from 'react-calendar';
import { useState, useEffect, useContext } from "react";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router";
import { User } from '../../ReservaHotelesApp';
import '../assets/estilos/CalendarioProductoDetalle.css'

export const DetalleAlojamientoCalendarioComponent = ({ productoId, fechaInicio, fechaFin, reservas }) => {
    const [calendarioDoble, setCalendarioDoble] = useState(window.innerWidth > 450);
    const [fecha, setFecha] = useState([fechaInicio, fechaFin]);
    const [user] = useContext(User);
    const navigate = useNavigate();

    useEffect(() => {
        function handleResize() {
            //setCalendarioDoble(window.innerWidth > 450);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const NotLoggedIn = () => {
        if (!user) {
            navigate("/login?reserva=1");
        } else if (!fecha[0] || !fecha[1]) {
            navigate(`/producto/${productoId}/reserva`);
        } else {
            navigate(`/producto/${productoId}/reserva?fecha_inicio=${fecha[0]}&fecha_fin=${fecha[1]}`);
        }
    };

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            for (let reserva of reservas) {
                const inicio = new Date(reserva.fecha_inicio);
                const fin = new Date(reserva.fecha_fin);
                if (date >= inicio && date <= fin) {
                    return 'disabled-date';
                }
            }
        }
        return null;
    };

    return (
        <div className="container">
            <div className="titulo">
                <h3>Fechas Disponibles</h3>
            </div>
            <div className="row reserva-container">
                <div className="col-lg-8 col-md-12 calendar-container">
                    <Calendar
                        className="react-calendar"
                        showDoubleView={calendarioDoble}
                        defaultView="month"
                        minDate={new Date()}
                        minDetail="month"
                        showNavigation={true}
                        selectRange={true}
                        nextLabel={">"}
                        prevLabel={"<"}
                        prev2Label={null}
                        next2Label={null}
                        tileDisabled={({ date }) => {
                            if (reservas) {
                                return reservas.some(reserva => {
                                    return new Date(reserva.fecha_inicio) <= date && new Date(reserva.fecha_fin) >= date;
                                });
                            } return true;
                        }}
                        defaultValue={(fechaInicio && fechaFin) ? fecha.map(f => new Date(f + "T00:00:00")) : [new Date(), new Date()]}
                        onChange={(e) => {
                            setFecha(e.map(f => (new Date(f.setHours(0))).toISOString().split("T")[0]));
                        }}
                        tileClassName={tileClassName}
                    />
                </div>
                <div className="col-lg-4 col-md-12 iniciar-reserva">
                    <p>Agregá tus fechas de viaje para obtener precios exactos</p>
                    <button className="btn btn-primary btn-reserva" onClick={NotLoggedIn}>Iniciar Reserva</button>
                </div>
            </div>
        </div>
    );
};
