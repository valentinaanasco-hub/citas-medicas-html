const descripciones = {
    "terapia-neural": "La Terapia Neural regula el sistema nervioso mediante anestésicos locales.",
    "quiropraxia": "La Quiropraxia corrige desalineaciones en la columna para mejorar el sistema neuromúsculo-esquelético.",
    "fisioterapia": "La Fisioterapia rehabilita la función física y el movimiento mediante ejercicios y agentes físicos.",
    "nutricion": "La Nutrición diseña planes alimenticios personalizados para optimizar la salud y prevenir enfermedades.",
    "cardiologia": "La Cardiología diagnostica y trata las enfermedades del corazón y del sistema circulatorio.",
    "pediatria": "La Pediatría brinda atención médica integral a bebés, niños y adolescentes.",
    "dermatologia": "La Dermatología se encarga del cuidado, diagnóstico y tratamiento de la piel, pelo y uñas.",
    "neurologia": "La Neurología trata los trastornos del cerebro, la médula espinal y los nervios periféricos.",
    "ortopedia": "La Ortopedia corrige y trata las lesiones y enfermedades del sistema osteoarticular."

};
const cajaDescripcion = document.getElementById("descripcionEspecialidad");
document.querySelectorAll("#listaEspecialidades a").forEach((enlace) => {
  enlace.addEventListener("click", (e) => {
    e.preventDefault(); // evita que "#" haga saltar la página al inicio

    const clave = enlace.dataset.especialidad; // lee el atributo data-especialidad
    const texto = descripciones[clave];         // busca el texto en el diccionario

    cajaDescripcion.textContent = texto || "Descripción no disponible.";
  });
});