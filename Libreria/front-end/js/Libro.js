function buscarLibroPorFiltro(filtro) {
    if (filtro=== '') {
        listarLibro(); // Mostrar todos los médicos si estado es vacío
    }else{
        $.ajax({
            url: "http://localhost:8080/api/v1/Libro/busquedafiltro/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";
    
                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idLibro"]}</td>
                        <td class="text-center align-middle">${result[i]["Autor"]}</td>
                        <td class="text-center align-middle">${result[i]["Titulo"]}</td>
                        <td class="text-center align-middle">${result[i]["Genero"]}</td>
                        <td class="text-center align-middle">${result[i]["ISNB"]}</td>
                        <td class="text-center align-middle">${result[i]["EjemplaresDisponibles"]}</td>
                        <td class="text-center align-middle">${result[i]["EjemplaresOcupados"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarLibroBandera=false;" data-id="${result[i]["idLibro"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idLibro"]})" data-id="${result[i]["idLibro"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idLibro"]}"></i>
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

function buscarLibroPorEstado(estado) {
    if (estado === '') {
        listarLibro(); // Mostrar todos los médicos si estado es vacío
    } else if (estado === 'H') {
        // Mostrar solo los médicos habilitados si estado es 'H'
        $.ajax({
            url: "http://localhost:8080/api/v1/Libro/busquedafiltroestado/" + estado,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idLibro"]}</td>
                        <td class="text-center align-middle">${result[i]["Autor"]}</td>
                        <td class="text-center align-middle">${result[i]["Titulo"]}</td>
                        <td class="text-center align-middle">${result[i]["Genero"]}</td>
                        <td class="text-center align-middle">${result[i]["ISNB"]}</td>
                        <td class="text-center align-middle">${result[i]["EjemplaresDisponibles"]}</td>
                        <td class="text-center align-middle">${result[i]["EjemplaresOcupados"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarLibroBandera=false;" data-id="${result[i]["idLibro"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idLibro"]})" data-id="${result[i]["idLibro"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idLibro"]}"></i>
                        </td>
                    `;
                    cuerpoTabla.appendChild(trRegistro);
                }
            },
            error: function (error) {
                alert("Error en la petición: " + error);
            }
        });
    } else {
        // Mostrar solo los médicos deshabilitados si no es vacío ni 'H'
        $.ajax({
            url: "http://localhost:8080/api/v1/Libro/busquedafiltroestado/" + estado,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idLibro"]}</td>
                        <td class="text-center align-middle">${result[i]["Autor"]}</td>
                        <td class="text-center align-middle">${result[i]["Titulo"]}</td>
                        <td class="text-center align-middle">${result[i]["Genero"]}</td>
                        <td class="text-center align-middle">${result[i]["ISNB"]}</td>
                        <td class="text-center align-middle">${result[i]["EjemplaresDisponibles"]}</td>
                        <td class="text-center align-middle">${result[i]["EjemplaresOcupados"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarLibroBandera=false;" data-id="${result[i]["idLibro"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idLibro"]})" data-id="${result[i]["idLibro"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idLibro"]}"></i>
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
var url = "http://localhost:8080/api/v1/Libro/";

// Función para listar los médicos
function listarLibro() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                    <td>${result[i]["idLibro"]}</td>
                    <td class="text-center align-middle">${result[i]["Autor"]}</td>
                    <td class="text-center align-middle">${result[i]["Titulo"]}</td>
                    <td class="text-center align-middle">${result[i]["Genero"]}</td>
                    <td class="text-center align-middle">${result[i]["ISNB"]}</td>
                    <td class="text-center align-middle">${result[i]["EjemplaresDisponibles"]}</td>
                    <td class="text-center align-middle">${result[i]["EjemplaresOcupados"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar"  onclick="registrarLibroBandera=false;" data-id="${result[i]["idLibro"]}"></i>
                        <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idLibro"]})" data-id="${result[i]["idLibro"]}"></i>
                        <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idLibro"]}"></i>
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

var registrarLibroBandera = true;

// Función para registrar un médico
function registrarLibro() {
    var Autor = document.getElementById("Autor");
    var Titulo = document.getElementById("Titulo");
    var Genero = document.getElementById("Genero");
    var ISNB = document.getElementById("ISNB");
    var EjemplaresDisponibles = document.getElementById("EjemplaresDisponibles");
    var EjemplaresOcupados = document.getElementById("EjemplaresOcupados");

    // Verificar si algún campo obligatorio está vacío
    if (!validarAutor(Autor)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var forData = {
        "Autor": Autor.value,
        "Titulo": Titulo.value,
        "Genero": Genero.value,
        "ISNB": ISNB.value,
        "EjemplaresDisponibles": EjemplaresDisponibles.value,
        "EjemplaresOcupados": EjemplaresOcupados.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (registrarLibroBandera == true) {
        metodo = "POST";
        urlLocal = url;
        textoimprimir = Swal.fire({
            title: "LISTO",
            text: "Felicidades, Registrado con éxito",
            icon: "success"
        });
    } else {
        metodo = "PUT";
        urlLocal = url + idLibro;
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
                    listarLibro();
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error",
                    text: "¡El número de documento ya se encuentra registrado!",
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

// // Función para validar campos
// // Función Documento Identidad
// function validarCampos() {
//     var Autor = document.getElementById("Autor");
//     return validarAutor(Autor);
// }

// // Función para validar el documento de identidad
// function validartipoDocumento(cuadroNumero) {
//     var valor = cuadroNumero.value;
//     var valido = true;

//     if (valor.length < 1 || valor.length > 3) {
//         valido = false;
//     }

//     if (valido) {
//         cuadroNumero.className = "form-control is-valid";
//     } else {
//         cuadroNumero.className = "form-control is-invalid";
//     }

//     return valido;
// }



// Función para limpiar campos del formulario
function limpiar() {
    document.getElementById("Autor").value = "";
    document.getElementById("Autor").className = "form-control";
    document.getElementById("Titulo").value = "";
    document.getElementById("Titulo").className = "form-control";
    document.getElementById("Genero").value = "";
    document.getElementById("Genero").className = "form-control";
    document.getElementById("ISNB").value = "";
    document.getElementById("ISNB").className = "form-control";
    document.getElementById("EjemplaresDisponibles").value = "";
    document.getElementById("EjemplaresDisponibles").className = "form-control";
    document.getElementById("EjemplaresOcupados").value = "";
    document.getElementById("EjemplaresOcupados").className = "form-control";

var idLibro = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idLibro = $(this).data("id");

    $.ajax({
        url: url + idLibro,
        type: "GET",
        success: function (Libro) {
            document.getElementById("Autor").value = Libro.Autor;
            document.getElementById("Titulo").value = Libro.Titulo;
            document.getElementById("Genero").value = Libro.Genero;
            document.getElementById("ISNB").value = Libro.ISNB;
            document.getElementById("EjemplaresDisponibles").value = Libro.EjemplaresDisponibles;
            document.getElementById("EjemplaresOcupados").value = Libro.EjemplaresOcupados;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos del Libro: " + error.statusText);
        }
    });
});

$(document).on("click", ".cambiarEstado", function () {
    var idLibro = $(this).data("id");
    $.ajax({
        url: url + idLibro,
        type: "DELETE",
        success: function () {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Cambio de estado exitoso",
                showConfirmButton: false,
                timer: 1500
            });
            listarLibro(); // Actualiza la lista de pacientes en el front-end
        }
    });
});



$(document).on("click", ".eliminar", function () {
    // Obtener el ID del médico desde el atributo data del elemento clicado
    var idLibro = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar este Libro?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarPermanente/" + idLibro,
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
                    // Actualizar la lista de médicos después de eliminar
                    listarLibro();
                },
                error: function (xhr, status, error) {
                    // Manejo de errores
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El registro tiene una venta.'
                    });
                }
            });
        }
    });
});




// Llamar a la función para listar médicos al cargar la página
$(document).ready(function () {
    listarLibro();
});
function actualizarlistarLibro() {
    listarLibro();
}
}
