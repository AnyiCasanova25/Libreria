function buscarUsuarioPorFiltro(filtro) {
    if (filtro=== '') {
        listarUsuario(); // Mostrar todos los médicos si estado es vacío
    }else{
        $.ajax({
            url: "http://localhost:8080/api/v1/Usuario/busquedafiltro/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";
    
                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                    <td class="text-center align-middle">${result[i]["idUsuario"]}</td>
                    <td class="text-center align-middle">${result[i]["nombre"]}</td>
                    <td class="text-center align-middle">${result[i]["correo"]}</td>
                    <td class="text-center align-middle">${result[i]["direccion"]}</td>
                    <td class="text-center align-middle">${result[i]["tipoUsuario"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarUsuarioBandera=false;" data-id="${result[i]["idUsuario"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idUsuario"]}"></i>
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
var url = "http://localhost:8080/api/v1/Usuario/";

// Función para listar los médicos
function listarUsuario() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                    <td class="text-center align-middle">${result[i]["idUsuario"]}</td>
                    <td class="text-center align-middle">${result[i]["nombre"]}</td>
                    <td class="text-center align-middle">${result[i]["correo"]}</td>
                    <td class="text-center align-middle">${result[i]["direccion"]}</td>
                    <td class="text-center align-middle">${result[i]["tipoUsuario"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar"  onclick="registrarUsuarioBandera=false;" data-id="${result[i]["idUsuario"]}"></i>
                        <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idUsuario"]}"></i>
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

var registrarUsuarioBandera = true;

// Función para registrar un médico
function registrarUsuario() {
    var nombre = document.getElementById("nombre");
    var correo = document.getElementById("correo");
    var direccion = document.getElementById("direccion");
    var tipoUsuario = document.getElementById("tipoUsuario");

    // Verificar si algún campo obligatorio está vacío
    if (!validarNombre(nombre) ||
        !validarCorreo(correo) ||
        !validarCorreo(direccion) ||
        !validarTipoUsuario(tipoUsuario)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var FormData = {
        "nombre": nombre.value,
        "correo": correo.value,
        "direccion": direccion.value,
        "tipoUsuario": tipoUsuario.value,
    };

    var metodo = "";
    var urlLocal = "";
    if (registrarUsuarioBandera == true) {
        metodo = "POST";
        urlLocal = url;
        // textoimprimir = Swal.fire({
        //     title: "LISTO",
        //     text: "Felicidades, Registrado con éxito",
        //     icon: "success"
        // });
    } else {
        metodo = "PUT";
        urlLocal = url + idUsuario;
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
                    listarUsuario();
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error",
                    text: "¡El usuario ya se encuentra registrado!",
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
    var nombre = document.getElementById("nombre");
    var correo = document.getElementById("correo");
    var direccion = document.getElementById("direccion");
    var tipoUsuario = document.getElementById("tipoUsuario");

    return validarNombre(nombre) && validarCorreo(correo) && validarDireccion(direccion) &&validarTipoUsuario(tipoUsuario);
}

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

// Función primerApellido

function validarCorreo(cuadroNumero) {
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

function validarDireccion(cuadroNumero) {
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

function validarTipoUsuario(cuadroNumero) {
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
    document.getElementById("correo").value = "";
    document.getElementById("correo").className = "form-control";
    document.getElementById("direccion").value = "";
    document.getElementById("direccion").className = "form-control";
    document.getElementById("tipoUsuario").value = "";
    document.getElementById("tipoUsuario").value = "form-control";
}

var idUsuario = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idUsuario = $(this).data("id");

    $.ajax({
        url: url + idUsuario,
        type: "GET",
        success: function (Usuario) {
            document.getElementById("nombre").value = Usuario.nombre;
            document.getElementById("correo").value = Usuario.correo;
            document.getElementById("direccion").value = Usuario.direccion;
            document.getElementById("tipoUsuario").value = Usuario.tipoUsuario;
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
    var idUsuario = $(this).data("id");

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
                url: url + "eliminarPermanente/" + idUsuario,
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
                    listarUsuario();
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
    listarUsuario();
});
function actualizarlistarUsuario() {
    listarUsuario();
}

