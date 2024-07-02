package com.libreria.libreria.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.libreria.libreria.interfaceService.IUsuarioService;
import com.libreria.libreria.models.Usuario;

@RestController
@RequestMapping("/api/v1/Usuario")
public class UsuarioController {

    @Autowired
    private IUsuarioService UsuarioService;

    @PostMapping("/")
    public ResponseEntity<Object> save(@ModelAttribute("Usuario") Usuario Usuario) {

        if (Usuario.getNombre().equals("")) {

            return new ResponseEntity<>("El nombre es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }
        if (Usuario.getCorreo().equals("")) {

            return new ResponseEntity<>("El correo es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Usuario.getTipoUsuario().equals("")) {

            return new ResponseEntity<>("El tipo de usuario es un campo obligatorio", HttpStatus.BAD_REQUEST);
        }

        UsuarioService.save(Usuario);
        return new ResponseEntity<>(Usuario, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaUsuario = UsuarioService.findAll();
        return new ResponseEntity<>(listaUsuario, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltro/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaUsuario = UsuarioService.filtroUsuario(filtro);
        return new ResponseEntity<>(listaUsuario, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var Usuario = UsuarioService.findOne(id);
        return new ResponseEntity<>(Usuario,HttpStatus.OK);
    }

    @DeleteMapping("/eliminarPermanente/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id) {
        UsuarioService.deleteForever(id);
        return new ResponseEntity<>("Registro eliminado Permanentemente", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("Usuario") Usuario UsuarioUpdate) {
        var Usuario = UsuarioService.findOne(id).get();
        if (Usuario != null) {

            Usuario.setNombre(UsuarioUpdate.getNombre());
            Usuario.setCorreo(UsuarioUpdate.getCorreo());
            Usuario.setTipoUsuario(UsuarioUpdate.getTipoUsuario());

            UsuarioService.save(Usuario);
            return new ResponseEntity<>(Usuario, HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Error Usuario NO encontrado", HttpStatus.BAD_REQUEST);
        }
    }
}
