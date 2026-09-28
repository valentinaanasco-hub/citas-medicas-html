const formPaciente = document.getElementById("formPaciente");
const pacienteSelect = document.getElementById("pacienteSelect");
const btnAgregarPaciente = document.getElementById("btnAgregarPaciente");

const inputNombresPaciente = document.getElementById("nombresPaciente");
const inputApellidosPaciente = document.getElementById("apellidosPaciente");
const selectTipoIdentificacion = document.getElementById("tipoIdentificacion");
const inputNumeroIdentificacion = document.getElementById("numeroIdentificacion");

const errorNombresPaciente = document.getElementById("errorNombresPaciente");
const errorApellidosPaciente = document.getElementById("errorApellidosPaciente");
const errorTipoIdentificacion = document.getElementById("errorTipoIdentificacion");
const errorNumeroIdentificacion = document.getElementById("errorNumeroIdentificacion");
const errorGenero = document.getElementById("errorGenero");

formPaciente.addEventListener("input", () => {
  btnAgregarPaciente.disabled = !formPaciente.checkValidity();
});

function validarFormularioPaciente() {
  const validNombres = validarCampoObligatorio(inputNombresPaciente, errorNombresPaciente, "El nombre es obligatorio")
    && validarLongitud(inputNombresPaciente, errorNombresPaciente, 1, 20, "El nombre debe tener entre 1 y 20 caracteres");

  const validApellidos = validarCampoObligatorio(inputApellidosPaciente, errorApellidosPaciente, "El apellido es obligatorio")
    && validarLongitud(inputApellidosPaciente, errorApellidosPaciente, 1, 20, "El apellido debe tener entre 1 y 20 caracteres");

  const validTipoIdentificacion = validarSelect(selectTipoIdentificacion, errorTipoIdentificacion, "Debe seleccionar un tipo de identificación");

  const validNumeroIdentificacion = validarCampoObligatorio(inputNumeroIdentificacion, errorNumeroIdentificacion, "El número de identificación es obligatorio")
    && validarNumeroPositivo(inputNumeroIdentificacion, errorNumeroIdentificacion, "El Número de identificación deben ser un número mayor a 0");


  const validGenero = validarRadioGroup("genero", errorGenero, "Debe seleccionar un género");

  return validNombres && validApellidos && validTipoIdentificacion && validNumeroIdentificacion && validGenero;
}

// Validaciones al perder el foco / al cambiar
inputNombresPaciente.addEventListener("blur", () => {
  validarCampoObligatorio(inputNombresPaciente, errorNombresPaciente, "El nombre es obligatorio")
    && validarLongitud(inputNombresPaciente, errorNombresPaciente, 1, 20, "El nombre debe tener entre 1 y 20 caracteres");
});
inputApellidosPaciente.addEventListener("blur", () => {
  validarCampoObligatorio(inputApellidosPaciente, errorApellidosPaciente, "El apellido es obligatorio")
    && validarLongitud(inputApellidosPaciente, errorApellidosPaciente, 1, 20, "El apellido debe tener entre 1 y 20 caracteres");
});
selectTipoIdentificacion.addEventListener("change", () => {
  validarSelect(selectTipoIdentificacion, errorTipoIdentificacion, "Debe seleccionar un tipo de identificación");
});
inputNumeroIdentificacion.addEventListener("blur", () => {
  validarCampoObligatorio(inputNumeroIdentificacion, errorNumeroIdentificacion, "El número de identificación es obligatorio");
});
// El evento "change" en cada radio, para validar apenas el usuario elige uno
document.querySelectorAll('input[name="genero"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    validarRadioGroup("genero", errorGenero, "Debe seleccionar un género");
  });
});

formPaciente.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validarFormularioPaciente()) {
    mostrarNotificacion("Por favor corrige los errores del formulario", "error");
    return;
  }

  const nombres = document.getElementById("nombresPaciente").value;
  const apellidos = document.getElementById("apellidosPaciente").value;
  const tipoIdentificacion = document.getElementById("tipoIdentificacion").value;
  const numeroIdentificacion = document.getElementById("numeroIdentificacion").value;
  const genero = document.querySelector('input[name="genero"]:checked').value;

  const paciente = gestionarPacientes.registrarPaciente(nombres, apellidos, tipoIdentificacion, numeroIdentificacion, genero);
  console.log("Paciente registrado:", paciente);

  const option = document.createElement("option");
  option.value = paciente.id;
  option.textContent = `${paciente.nombres} ${paciente.apellidos}`;

  if (pacienteSelect) {          
    pacienteSelect.appendChild(option);
  }

  formPaciente.reset();
  btnAgregarPaciente.disabled = true;

  mostrarNotificacion(`Paciente ${paciente.nombres} ${paciente.apellidos} registrado con éxito`);
});