package com.libreria.libreria.service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.libreria.libreria.interfaceService.IMultaService;
import com.libreria.libreria.interfaces.IMulta;
import com.libreria.libreria.models.Multa;
@Service
public class MultaService implements IMultaService {

    @Autowired
    private IMulta data;

    @Override
    public String save(Multa Multa) {
        data.save(Multa);
        return Multa.getIdMulta();
    }

    @Override
    public List<Multa> findAll() {
        List<Multa> listaMulta = (List<Multa>) data.findAll();
        return listaMulta;
    }

    @Override
    public List<Multa> multaExist(String filtro) {
        List<Multa> listaMulta = data.multaExist(filtro, filtro, filtro);
        return listaMulta;
    }

    @Override
    public List<Multa> filtroFechaMulta(Date fechaMulta) {
        List <Multa> listaMulta = data.filtroFechaMulta(fechaMulta);
        return listaMulta;
    }

    @Override
    public Optional<Multa> findOne(String id) {
        Optional<Multa> Multa = data.findById(id);
        return Multa;
    }

    @Override
    public int deleteForever(String id) {
        data.deleteById(id);
        return 1;
    }
    
}
