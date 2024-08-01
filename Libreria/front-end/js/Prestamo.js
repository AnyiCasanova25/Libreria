function buscarPrestamoPorFiltro(filtro) {
    if (filtro === '') {
        listarPrestamo(); // Mostrar todos los médicos si estado es vacío
    } else {
        $.ajax({
            url: "http://localhost:8080/api/v1/Prestamo/busquedafiltro/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idPrestamo"]}</td>
                        <td class="text-center align-middle">${result[i]["FechaPrestamo"]}</td>
                        <td class="text-center align-middle">${result[i]["FechaDevolucion"]}</td>
                         <td class="text-center align-middle">${result[i]["Usuario"]}</td>
                          <td class="text-center align-middle">${result[i]["Libro"]}</td>
                        <td class="text-center align-middle">${result[i]["Estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarPrestamoBandera=false;" data-id="${result[i]["idPrestamo"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idPrestamo"]}"></i>
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
var url = "http://localhost:8080/api/v1/Prestamo/";

// Función para listar los médicos
function listarPrestamo() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                    <td>${result[i]["idPrestamo"]}</td>
                    <td class="text-center align-middle">${result[i]["fechaPrestamo"]}</td>
                    <td class="text-center align-middle">${result[i]["fechaDevolucion"]}</td>
                    <td class="text-center align-middle">${result[i]["Usuario"]["Usuario"]}</td>
                    <td class="text-center align-middle">${result[i]["Libro"]["Libro"]}</td>
                    <td class="text-center align-middle">${result[i]["estado"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar"  onclick="registrarUsuarioBandera=false;" data-id="${result[i]["idPrestamo"]}"></i>
                        <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idPrestamo"]}"></i>
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
    cargarLibroActivos();
});

// Función para cargar la lista de pacientes activos
function cargarLibroActivos() {
    $.ajax({
        url: "http://localhost:8080/api/v1/Libro/",
        type: "GET",
        success: function (result) {
            result.forEach(function (Libro) {
                $("#Libro").append(`<option value="${Libro.idLibro}">${Libro.titulo}</option>`);
            });
        },
        error: function (error) {
            console.error("Error al cargar Libros activos:", error);
        }
    });
}

var registrarPrestamoBandera = true;

// Función para registrar un médico
function registrarPrestamo() {
    var fechaPrestamo = document.getElementById("fechaPrestamo");
    var fechaDevolucion = document.getElementById("fechaDevolucion");
    var Usuario = document.getElementById("Usuario");
    var Libro = document.getElementById("Libro");
    var estado = document.getElementById("estado");

    // Verificar si algún campo obligatorio está vacío
    if (!validarFechaPrestamo(fechaPrestamo) ||
        !validarFechaDevolucion(fechaDevolucion) ||
        !validarUsuario(Usuario) ||
        !validarLibro(Libro) ||
        !validarEstado(estado)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var forData = {
        "fechaPrestamo": fechaPrestamo.value,
        "fechaDevolucion": fechaDevolucion.value,
        "Usuario": Usuario.value,
        "Libro": Libro.value,
        "estado": estado.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (registrarPrestamoBandera == true) {
        metodo = "POST";
        urlLocal = url;
        textoimprimir = Swal.fire({
            title: "LISTO",
            text: "Felicidades, Registrado con éxito",
            icon: "success"
        });
    } else {
        metodo = "PUT";
        urlLocal = url + idPrestamo;
        textoimprimir = Swal.fire({
            title: "LISTO",
            text: "Felicidades, Guardado con éxito",
            icon: "success"
        });
    }

    if (validarCampos()) {
        $.ajax({
            url: urlLocal,
            type: metodo,
            data: forData,
            success: function (response) {
                Swal.fire({
                    title: "Éxito",
                    text: "Felicidades, Guardado con éxito",
                    icon: "success"
                }).then(function () {
                    // Aquí puedes agregar más acciones después del registro exitoso
                    $('#exampleModal').modal('hide');
                    listarPrestamo();
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error",
                    text: "¡El prestamo ya se encuentra registrado!",
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


// Función primerUsuario
function validarCampos() {
    var fechaPrestamo = document.getElementById("fechaPrestamo");
    var fechaDevolucion = document.getElementById("fechaDevolucion");
    var Usuario = document.getElementById("Usuario");
    var Libro = document.getElementById("Libro");
    var estado = document.getElementById("estado");

    return validarFechaPrestamo(fechaPrestamo) && validarFechaDevolucion(fechaDevolucion) && validarUsuario(Usuario) && validarLibro(Libro) && validarEstado(estado);
}

function validarFechaPrestamo(cuadroNumero) {
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

function validarFechaDevolucion(cuadroNumero) {
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

function validarNombre(cuadroNumero) {
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

function validarLibro(cuadroNumero) {
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


// Función para limpiar campos del formulario
function limpiar() {
    document.getElementById("fechaPrestamo").value = "";
    document.getElementById("fechaPrestamo").className = "form-control";
    document.getElementById("fechaDevolucion").value = "";
    document.getElementById("fechaDevolucion").className = "form-control";
    document.getElementById("Usuario").value = "";
    document.getElementById("Usuario").className = "form-control";
    document.getElementById("Libro").value = "";
    document.getElementById("Libro").className = "form-control";
    document.getElementById("estado").value = "";
    document.getElementById("estado").className = "form-control";
}

var idPrestamo = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idPrestamo = $(this).data("id");

    $.ajax({
        url: url + idPrestamo,
        type: "GET",
        success: function (Prestamo) {
            document.getElementById("fechaPrestamo").value = Prestamo.FechaPrestamo;
            document.getElementById("fechaDevolucion").value = Prestamo.FechaDevolucion;
            document.getElementById("Usuario").value = Prestamo.Usuario.idUsuario;
            document.getElementById("Libro").value = Prestamo.Libro.idLibro;
            document.getElementById("estado").value = Prestamo.Estado;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos del Prestamo: " + error.statusText);
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
    var idPrestamo = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar este Prestamo?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarPermanente/" + idPrestamo,
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
                    listarPrestamo();
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
    listarPrestamo();
});
function actualizarlistarPrestamo() {
    listarPrestamo();
}

