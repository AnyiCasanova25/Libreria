package com.libreria.libreria.interfaceService;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.libreria.libreria.models.Multa;

public interface IMultaService {
    
    public String save(Multa Multa);

    public List<Multa> findAll();

    public List<Multa> multaExist(String filtro);

    public List<Multa> filtroFechaMulta(Date fechaMulta);

    public Optional<Multa> findOne(String id);

    public int deleteForever(String id);
}
