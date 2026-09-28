const formMedico = document.getElementById("formMedico");
const medicoSelect = document.getElementById("medicoSelect");
const btnAgregarMedico = document.getElementById("btnAgregarMedico");

const inputNombresMedico = document.getElementById("nombres");
const inputApellidosMedico = document.getElementById("apellidos");
const inputEspecialidad = document.getElementById("especialidad");
const inputAniosExperiencia = document.getElementById("AniosExperiencia");
const inputBibliografia = document.getElementById("bibliografia");

const errorNombres = document.getElementById("errorNombres");
const errorApellidos = document.getElementById("errorApellidos");
const errorEspecialidad = document.getElementById("errorEspecialidad");
const errorAniosExperiencia = document.getElementById("errorAniosExperiencia");
const errorBibliografia = document.getElementById("errorBibliografia");

formMedico.addEventListener("input", () => {
  btnAgregarMedico.disabled = !formMedico.checkValidity();
});

function validarFormularioMedico() {
  const validNombres = validarCampoObligatorio(inputNombresMedico, errorNombres, "El nombre es obligatorio")
    && validarLongitud(inputNombresMedico, errorNombres, 1, 20, "El nombre debe tener entre 1 y 20 caracteres");

  const validApellidos = validarCampoObligatorio(inputApellidosMedico, errorApellidos, "El apellido es obligatorio")
    && validarLongitud(inputApellidosMedico, errorApellidos, 1, 20, "El apellido debe tener entre 1 y 20 caracteres");

  const validEspecialidad = validarCampoObligatorio(inputEspecialidad, errorEspecialidad, "La especialidad es obligatoria");

  const validAniosExperiencia = validarCampoObligatorio(inputAniosExperiencia, errorAniosExperiencia, "Los años de experiencia son obligatorios")
    && validarNumeroPositivo(inputAniosExperiencia, errorAniosExperiencia, "Los años de experiencia deben ser un número mayor a 0");

  const validBibliografia = validarCampoObligatorio(inputBibliografia, errorBibliografia, "La bibliografía es obligatoria");

  return validNombres && validApellidos && validEspecialidad && validAniosExperiencia && validBibliografia;
}

inputNombresMedico.addEventListener("blur", () => {
  validarCampoObligatorio(inputNombresMedico, errorNombres, "El nombre es obligatorio")
    && validarLongitud(inputNombresMedico, errorNombres, 1, 20, "El nombre debe tener entre 1 y 20 caracteres");
});
inputApellidosMedico.addEventListener("blur", () => {
  validarCampoObligatorio(inputApellidosMedico, errorApellidos, "El apellido es obligatorio")
    && validarLongitud(inputApellidosMedico, errorApellidos, 1, 20, "El apellido debe tener entre 1 y 20 caracteres");
});
inputEspecialidad.addEventListener("blur", () => {
  validarCampoObligatorio(inputEspecialidad, errorEspecialidad, "La especialidad es obligatoria");
});
inputAniosExperiencia.addEventListener("blur", () => {
  validarCampoObligatorio(inputAniosExperiencia, errorAniosExperiencia, "Los años de experiencia son obligatorios")
    && validarNumeroPositivo(inputAniosExperiencia, errorAniosExperiencia, "Los años de experiencia deben ser un número mayor a 0");
});
inputBibliografia.addEventListener("blur", () => {
  validarCampoObligatorio(inputBibliografia, errorBibliografia, "La bibliografía es obligatoria");
});

formMedico.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validarFormularioMedico()) {
    mostrarNotificacion("Por favor corrige los errores del formulario", "error");
    return;
  }

  const nombres = document.getElementById("nombres").value;
  const apellidos = document.getElementById("apellidos").value;
  const especialidad = document.getElementById("especialidad").value;
  const horaInicio = document.getElementById("horaInicioMedico").value;
  const horaFin = document.getElementById("horaFinMedico").value;
  const AniosExperiencia = document.getElementById("AniosExperiencia").value;
  const bibliografia = document.getElementById("bibliografia").value;

  try {
    const medico = gestionarMedicos.registrarMedico(nombres, apellidos, especialidad, horaInicio, horaFin, AniosExperiencia, bibliografia);

    const option = document.createElement("option");
    option.value = medico.id;
    option.textContent = `${medico.nombres} ${medico.apellidos}`;
    medicoSelect.appendChild(option);

    formMedico.reset();
    btnAgregarMedico.disabled = true;

    mostrarNotificacion(`Médico ${medico.nombres} ${medico.apellidos} registrado con éxito`);
  } catch (error) {
    mostrarNotificacion(error.message, "error");
  }
});