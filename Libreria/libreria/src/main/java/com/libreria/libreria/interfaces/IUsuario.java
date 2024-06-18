package com.libreria.libreria.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.libreria.libreria.models.Usuario;

@Repository
public interface IUsuario extends CrudRepository<Usuario, String>{
    
    // Buscar usuarios por nombre o correo electrónico.

    @Query("SELECT u FROM Usuario u WHERE u.Nombre LIKE %?1% OR u.Correo LIKE %?1%")
    List<Usuario> filtroUsuario(String filtro);

}
