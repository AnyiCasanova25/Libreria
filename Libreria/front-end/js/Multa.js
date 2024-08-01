function buscarMultaPorFiltro(filtro) {
    if (filtro=== '') {
        listarMulta(); // Mostrar todos los médicos si estado es vacío
    }else{
        $.ajax({
            url: "http://localhost:8080/api/v1/Multa/busquedafiltro/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";
    
                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td class="text-center align-middle">${result[i]["idMulta"]}</td>
                        <td class="text-center align-middle">${result[i]["Usuario"]}</td>
                        <td class="text-center align-middle">${result[i]["Prestamo"]}</td>
                        <td class="text-center align-middle">${result[i]["ValorMulta"]}</td>
                        <td class="text-center align-middle">${result[i]["FechaMulta"]}</td>
                        <td class="text-center align-middle">${result[i]["Estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarMultaBandera=false;" data-id="${result[i]["idMulta"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idMulta"]}"></i>
                        </td>
                    `;
                    cuerpoTabla.appendChild(trRegistro);
                }
            },
            error: function (error) {
                alert("Error en la petición: " + error);
            }
        });
    }
    
}

// URL de la API
var url = "http://localhost:8080/api/v1/Multa/";

// Función para listar los médicos
function listarMulta() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                    <td class="text-center align-middle">${result[i]["idMulta"]}</td>
                        <td class="text-center align-middle">${result[i]["Usuario"]}</td>
                        <td class="text-center align-middle">${result[i]["Prestamo"]}</td>
                        <td class="text-center align-middle">${result[i]["ValorMulta"]}</td>
                        <td class="text-center align-middle">${result[i]["FechaMulta"]}</td>
                        <td class="text-center align-middle">${result[i]["Estado"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar"  onclick="registrarMultaBandera=false;" data-id="${result[i]["idMulta"]}"></i>
                        <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idMulta"]}"></i>
                    </td>
                `;
                cuerpoTabla.appendChild(trRegistro);
            }
        },
        error: function (error) {
            alert("Error en la petición: " + error);
        }
    });
}

// Llamar a las funciones para cargar las listas al cargar la página
$(document).ready(function () {
    cargarUsuarioActivos();
});

// Función para cargar la lista de pacientes activos
function cargarUsuarioActivos() {
    $.ajax({
        url: "http://localhost:8080/api/v1/Usuario/",
        type: "GET",
        success: function (result) {
            result.forEach(function (Usuario) {
                $("#Usuario").append(`<option value="${Usuario.idUsuario}">${Usuario.nombre}</option>`);
            });
        },
        error: function (error) {
            console.error("Error al cargar usuarios activos:", error);
        }
    });
}

// Llamar a las funciones para cargar las listas al cargar la página
$(document).ready(function () {
    cargarPrestamoActivos();
});

// Función para cargar la lista de pacientes activos
function cargarPrestamoActivos() {
    $.ajax({
        url: "http://localhost:8080/api/v1/Prestamo/",
        type: "GET",
        success: function (result) {
            result.forEach(function (Prestamo) {
                $("#Prestamo").append(`<option value="${Prestamo.idPrestamo}">${Prestamo.fechaPrestamo}</option>`);
            });
        },
        error: function (error) {
            console.error("Error al cargar Prestamos activos:", error);
        }
    });
}

var registrarMultaBandera = true;

// Función para registrar un médico
function registrarMulta() {
    var Usuario = document.getElementById("Usuario");
    var Prestamo = document.getElementById("Prestamo");
    var valorMulta = document.getElementById("valorMulta");
    var fechaMulta = document.getElementById("fechaMulta");
    var estado = document.getElementById("estado");


    // Verificar si algún campo obligatorio está vacío
    if (!validarUsuario(Usuario) ||
        !validarPrestamo(Prestamo) ||
        !validarValorMulta(valorMulta) ||
        !validarFechaMulta(fechaMulta) ||
        !validarEstado(estado)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var FormData = {
        "Usuario": Usuario.value,
        "Prestamo": Prestamo.value,
        "valorMulta": valorMulta.value,
        "fechaMulta": fechaMulta.value,
        "estado": estado.value,
    };

    var metodo = "";
    var urlLocal = "";
    if (registrarMultaBandera == true) {
        metodo = "POST";
        urlLocal = url;
        // textoimprimir = Swal.fire({
        //     title: "LISTO",
        //     text: "Felicidades, Registrado con éxito",
        //     icon: "success"
        // });
    } else {
        metodo = "PUT";
        urlLocal = url + idMulta;
        // textoimprimir = Swal.fire({
        //     title: "LISTO",
        //     text: "Felicidades, Guardado con éxito",
        //     icon: "success"
        // });
    }

    if (validarCampos()) {
        $.ajax({
            url: urlLocal,
            type: metodo,
            contentType:"application/json",
            data:JSON.stringify(FormData),
            success: function (response) {
                Swal.fire({
                    title: "Éxito",
                    text: "Felicidades, Guardado con éxito",
                    icon: "success"
                }).then(function () {
                    // Aquí puedes agregar más acciones después del registro exitoso
                    $('#exampleModal').modal('hide');
                    listarMulta();
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error",
                    text: "¡La multa ya se encuentra registrada!",
                    icon: "error"
                });
            }
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
    }
};


// Función primerNombre
function validarCampos() {
    var Usuario = document.getElementById("Usuario");
    var Prestamo = document.getElementById("Prestamo");
    var valorMulta = document.getElementById("valorMulta");
    var fechaMulta = document.getElementById("fechaMulta");
    var estado = document.getElementById("estado");

    return validarUsuario(Usuario) && validarPrestamo(Prestamo) &&
    validarValorMulta(valorMulta) && validarFechaMulta(fechaMulta) &&
     validarEstado(estado);
}

function validarUsuario(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 100) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función primerApellido

function validarPrestamo(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 100) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función Telefono

function validarValorMulta(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 15) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

function validarFechaMulta(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 15) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

function validarEstado(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 15) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función para limpiar campos del formulario
function limpiar() {
    document.getElementById("nombre").value = "";
    document.getElementById("nombre").className = "form-control";
    document.getElementById("fechaPrestamo").value = "";
    document.getElementById("fechaPrestamo").className = "form-control";
    document.getElementById("valorMulta").value = "";
    document.getElementById("valorMulta").className = "form-control";
    document.getElementById("fechaMulta").value = "";
    document.getElementById("fechaMulta").className = "form-control";
    document.getElementById("estado").value = "";
    document.getElementById("estado").className = "form-control";
}

var idMulta = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idMulta = $(this).data("id");

    $.ajax({
        url: url + idMulta,
        type: "GET",
        success: function (Multa) {
            document.getElementById("Usuario").value = Multa.Usuario.idUsuario;
            document.getElementById("Prestamo").value = Multa.Prestamo.idPrestamo;
            document.getElementById("valorMulta").value = Multa.valorMulta;
            document.getElementById("fechaMulta").value = Multa.fechaMulta;
            document.getElementById("estado").value = Multa.estado;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos del Usuario: " + error.statusText);
        }
    });
});

// $(document).on("click", ".cambiarEstado", function () {
//     var idMedico = $(this).data("id");
//     $.ajax({
//         url: url + idMedico,
//         type: "DELETE",
//         success: function () {
//             Swal.fire({
//                 position: "top-end",
//                 icon: "success",
//                 title: "Cambio de estado exitoso",
//                 showConfirmButton: false,
//                 timer: 1500
//             });
//             listarMedico(); // Actualiza la lista de pacientes en el front-end
//         }
//     });
// });



$(document).on("click", ".eliminar", function () {
    // Obtener el ID del médico desde el atributo data del elemento clicado
    var idMulta = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar este usuario?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarPermanente/" + idMulta,
                type: "DELETE",
                success: function (eliminarPermanente) {
                    // Mostrar un mensaje de éxito
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Registro Eliminado",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Actualizar la lista de usuarios después de eliminar
                    listarMulta();
                },
                error: function (xhr, status, error) {
                    // Manejo de errores
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El registro tiene un prestamo.'
                    });
                }
            });
        }
    });
});




// Llamar a la función para listar médicos al cargar la página
$(document).ready(function () {
    listarMulta();
});
function actualizarlistarMulta() {
    listarMulta();
}

