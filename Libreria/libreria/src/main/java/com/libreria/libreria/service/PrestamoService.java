package com.libreria.libreria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.libreria.libreria.interfaceService.IPrestamoService;
import com.libreria.libreria.interfaces.IPrestamo;
import com.libreria.libreria.models.Prestamo;

@Service
public class PrestamoService implements IPrestamoService {

    @Autowired
    private IPrestamo data;

    @Override
    public String save(Prestamo Prestamo) {
        data.save(Prestamo);
        return Prestamo.getIdPrestamo();
    }

    @Override
    public List<Prestamo> findAll() {
        List<Prestamo> listaPrestamo = (List<Prestamo>) data.findAll();
        return listaPrestamo;
    }

    @Override
    public List<Prestamo> prestamoExist(String filtro) {
        List <Prestamo> listaPrestamo = data.prestamoExist(filtro, filtro, filtro);
        return listaPrestamo;
    }

    @Override
    public Optional<Prestamo> findOne(String id) {
        Optional<Prestamo> Prestamo = data.findById(id);
        return Prestamo;
    }

    @Override
    public int deleteForever(String id) {
        data.deleteById(id);
        return 1;
    }
    
}
