class GestionarMedicos {
  constructor(repoMedico) {
    this.medicoRepo = repoMedico;
  }

  registrarMedico(nombre, apellido, especialidad, horaInicio, horaFin, AniosExperiencia, bibliografia) {
    const id = this.medicoRepo.siguienteId();

      if (!this.validarHoras(horaInicio, horaFin)) {
      throw new Error("La hora de fin debe ser mayor a la hora de inicio");
      }
      
    const medico = new Medico(id, nombre, apellido, especialidad, horaInicio,horaFin, AniosExperiencia, bibliografia);
    this.medicoRepo.agregar(medico);
    return medico;
  }

    validarHoras(horaInicio, horaFin) {
    return horaFin > horaInicio; 
  }

  listarMedicos() {
    return this.medicoRepo.obtenerTodos();
  }

  buscarMedico(id) {
    return this.medicoRepo.buscarPorId(id);
  }
}

const gestionarMedicos = new GestionarMedicos(medicoRepo);

