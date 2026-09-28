

// Valida que un campo de texto no esté vacío
function validarCampoObligatorio(input, labelError, mensaje) {
  if (input.value.trim() === "") {
    labelError.textContent = mensaje;
    return false;
  }
  labelError.textContent = "";
  return true;
}

// Valida que un campo de texto tenga entre min y max caracteres
function validarLongitud(input, labelError, min, max, mensaje) {
  const longitud = input.value.trim().length;
  if (longitud < min || longitud > max) {
    labelError.textContent = mensaje;
    return false;
  }
  labelError.textContent = "";
  return true;
}

// Valida que un campo numérico sea un número mayor a 0
function validarNumeroPositivo(input, labelError, mensaje) {
  const valor = Number(input.value);
  if (isNaN(valor) || valor <= 0) {
    labelError.textContent = mensaje;
    return false;
  }
  labelError.textContent = "";
  return true;
}

// Valida que un <select> tenga una opción seleccionada (no la de placeholder)
function validarSelect(select, labelError, mensaje) {
  if (select.value === "") {
    labelError.textContent = mensaje;
    return false;
  }
  labelError.textContent = "";
  return true;
}

// Valida que se haya elegido una opción dentro de un grupo de radio buttons
function validarRadioGroup(nombreGrupo, labelError, mensaje) {
  const seleccionado = document.querySelector(`input[name="${nombreGrupo}"]:checked`);
  if (!seleccionado) {
    labelError.textContent = mensaje;
    return false;
  }
  labelError.textContent = "";
  return true;
}