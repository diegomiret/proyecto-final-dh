package com.proyectofinal.ReservasApi.service.imple;

import com.proyectofinal.ReservasApi.model.Ciudad;
import com.proyectofinal.ReservasApi.model.Reserva;
import com.proyectofinal.ReservasApi.repository.ICiudadrepository;
import com.proyectofinal.ReservasApi.repository.IReservaRepository;
import com.proyectofinal.ReservasApi.service.IReservaService;
import com.proyectofinal.ReservasApi.service.IUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaService implements IReservaService {

    @Autowired
    private IReservaRepository reservaRepository;

    @Override
    public List<Reserva> obtenerTodasLasReservas() {

        return reservaRepository.findAll();
    }
}
