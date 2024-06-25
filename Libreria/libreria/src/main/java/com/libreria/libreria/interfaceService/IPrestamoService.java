package com.libreria.libreria.interfaceService;

import java.util.List;
import java.util.Optional;

import com.libreria.libreria.models.Prestamo;

public interface IPrestamoService {
    
    public String save(Prestamo Prestamo);

    public List<Prestamo> findAll();

    public List<Prestamo> prestamoExist(String filtro);

    public Optional<Prestamo> findOne(String id);

    public int deleteForever(String id);
}
