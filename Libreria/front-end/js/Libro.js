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
                        <td class="text-center align-middle">${result[i]["idLibro"]}</td>
                        <td class="text-center align-middle">${result[i]["Titulo"]}</td>
                        <td class="text-center align-middle">${result[i]["Autor"]}</td>
                        <td class="text-center align-middle">${result[i]["ISBN"]}</td>
                        <td class="text-center align-middle">${result[i]["Genero"]}</td>
                        <td class="text-center align-middle">${result[i]["EjemplaresDisponibles"]}</td>
                        <td class="text-center align-middle">${result[i]["EjemplaresOcupados"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarLibroBandera=false;" data-id="${result[i]["idLibro"]}"></i>
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
                    <td class="text-center align-middle">${result[i]["idLibro"]}</td>
                    <td class="text-center align-middle">${result[i]["titulo"]}</td>
                    <td class="text-center align-middle">${result[i]["autor"]}</td>
                    <td class="text-center align-middle">${result[i]["isbn"]}</td>
                    <td class="text-center align-middle">${result[i]["genero"]}</td>
                    <td class="text-center align-middle">${result[i]["ejemplaresDisponibles"]}</td>
                    <td class="text-center align-middle">${result[i]["ejemplaresOcupados"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar"  onclick="registrarLibroBandera=false;" data-id="${result[i]["idLibro"]}"></i>
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
    var Titulo = document.getElementById("titulo");
    var Autor = document.getElementById("autor");
    var ISBN = document.getElementById("isbn");
    var Genero = document.getElementById("genero");
    var EjemplaresDisponibles = document.getElementById("ejemplaresDisponibles");
    var EjemplaresOcupados = document.getElementById("ejemplaresOcupados");

    // Verificar si algún campo obligatorio está vacío
    if (!validarAutor(Titulo) ||
        !validarISBN(Autor) ||
        !validarGenero(ISBN) ||
        !validarTitulo(Genero) ||
        !validarEjemplaresDisponibles(EjemplaresDisponibles) ||
        !validarEjemplaresOcupados(EjemplaresOcupados)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var FormData = {
        "autor": autor.value,
        "isbn": isbn.value,
        "genero": genero.value,
        "titulo": titulo.value,
        "ejemplaresDisponibles": ejemplaresDisponibles.value,
        "ejemplaresOcupados": ejemplaresOcupados.value,
    };

    var metodo = "";
    var urlLocal = "";
    if (registrarLibroBandera == true) {
        metodo = "POST";
        urlLocal = url;
        // textoimprimir = Swal.fire({
        //     title: "LISTO",
        //     text: "Felicidades, Registrado con éxito",
        //     icon: "success"
        // });
    } else {
        metodo = "PUT";
        urlLocal = url + idLibro;
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
                    listarLibro();
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error",
                    text: "¡El Libro ya se encuentra registrado!",
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
    var autor = document.getElementById("autor");
    var isbn = document.getElementById("isbn");
    var genero = document.getElementById("genero");
    var titulo = document.getElementById("titulo");
    var ejemplaresDisponibles = document.getElementById("ejemplaresDisponibles");
    var ejemplaresOcupados = document.getElementById("ejemplaresOcupados");

    return validarAutor(autor) && validarISBN(isbn) && validarGenero(genero) && validarTitulo(titulo) && validarEjemplaresDisponibles(ejemplaresDisponibles) && validarEjemplaresOcupados(ejemplaresOcupados);
}

function validarAutor(cuadroNumero) {
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

function validarISBN(cuadroNumero) {
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

function validarGenero(cuadroNumero) {
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

function validarTitulo(cuadroNumero) {
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

function validarEjemplaresDisponibles(cuadroNumero) {
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

function validarEjemplaresOcupados(cuadroNumero) {
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
    document.getElementById("autor").value = "";
    document.getElementById("autor").className = "form-control";
    document.getElementById("isbn").value = "";
    document.getElementById("isbn").className = "form-control";
    document.getElementById("genero").value = "";
    document.getElementById("genero").className = "form-control";
    document.getElementById("titulo").value = "";
    document.getElementById("titulo").className = "form-control";
    document.getElementById("ejemplaresDisponibles").value = "";
    document.getElementById("ejemplaresDisponibles").className = "form-control";
    document.getElementById("ejemplaresOcupados").value = "";
    document.getElementById("ejemplaresOcupados").className = "form-control";
}

var idLibro = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idLibro = $(this).data("id");

    $.ajax({
        url: url + idLibro,
        type: "GET",
        success: function (Libro) {
            document.getElementById("autor").value = Libro.Autor;
            document.getElementById("isbn").value = Libro.ISNB;
            document.getElementById("genero").value = Libro.Genero;
            document.getElementById("titulo").value = Libro.Titulo;
            document.getElementById("ejemplaresDisponibles").value = Libro.EjemplaresDisponibles;
            document.getElementById("ejemplaresOcupados").value = Libro.EjemplaresOcupados;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos del Libro: " + error.statusText);
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
        // Si el Libro confirma la eliminación, proceder con la solicitud AJAX
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
                    // Actualizar la lista de usuarios después de eliminar
                    listarLibro();
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
    listarLibro();
});
function actualizarlistarLibro() {
    listarLibro();
}

