package com.libreria.libreria.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.libreria.libreria.interfaceService.IUsuarioService;
import com.libreria.libreria.interfaces.IUsuario;
import com.libreria.libreria.models.Usuario;

@Service
public class UsuarioService implements IUsuarioService {

    @Autowired
    private IUsuario data;

    @Override
    public String save(Usuario Usuario) {
        data.save(Usuario);
        return Usuario.getIdUsuario();
    }

    @Override
    public List<Usuario> findAll() {
        List<Usuario> listaUsuario = (List<Usuario>) data.findAll();
        return listaUsuario;
    }

    @Override
    public List<Usuario> filtroUsuario(String filtro) {
        List<Usuario> listaUsuario = data.filtroUsuario(filtro);
        return listaUsuario;
    }

    @Override
    public Optional<Usuario> findOne(String id) {
        Optional<Usuario> Usuario = data.findById(id);
        return Usuario;
    }

    @Override
    public int deleteForever(String id) {
        data.deleteById(id);
        return 1;
    }

}