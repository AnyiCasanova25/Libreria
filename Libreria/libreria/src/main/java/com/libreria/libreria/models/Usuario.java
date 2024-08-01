package com.libreria.libreria.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Usuario")
public class Usuario {

    /*
     * o Nombre
     * o Dirección
     * o Correo electrónico
     * o Tipo de usuario (lector, bibliotecario, administrador)
     */

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idUsuario", nullable = false, length = 36)
    private String idUsuario;

    @Column(name = "nombre", nullable = false, length = 36)
    private String nombre;

    @Column(name = "correo", nullable = false, length = 36)
    private String correo;

    @Column(name = "tipoUsuario", nullable = false, length = 36)
    private String tipoUsuario;

    @Column(name = "direccion", nullable = false, length = 36)
    private String direccion;
}
