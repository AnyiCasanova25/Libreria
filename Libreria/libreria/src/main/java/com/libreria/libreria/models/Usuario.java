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

    @Column(name = "Nombre", nullable = false, length = 36)
    private String Nombre;

    @Column(name = "Correo", nullable = false, length = 36)
    private String Correo;

    @Column(name = "TipoUsuario", nullable = false, length = 36)
    private String TipoUsuario;
}
