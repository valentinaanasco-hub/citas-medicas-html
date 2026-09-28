class GestionarCitas {
  constructor(medicoRepo, pacienteRepo, citaRepo) {
    this.medicoRepo = medicoRepo;
    this.pacienteRepo = pacienteRepo;
    this.citaRepo = citaRepo;
  }
  registrarCita(fecha, horaInicio, horaFin, idMedico, idPaciente) {
    const id = this.citaRepo.siguienteId();
    const medico = this.medicoRepo.buscarPorId(idMedico);
    if (!medico) {
      throw new Error("Médico no encontrado");
    }
    const paciente = this.pacienteRepo.buscarPorId(idPaciente);
    if (!paciente) {
      throw new Error("Paciente no encontrado");
    }
    
    //llamado nueva funcion
    if(!this.validarHoras(horaInicio,horaFin)) {
        throw new Error("La hora de fin debe de ser mayor a la hora de inicio"); 
    }

    const cita = new Cita(id, fecha, horaInicio, horaFin, medico, paciente);
    this.citaRepo.agregar(cita);
    return cita;
  }

  // Nuevo método de validación de horas
  validarHoras(horaInicio, horaFin) {
    return horaFin > horaInicio; 
  }

  listarCitas() {
    return this.citaRepo.obtenerTodos();
  }

  buscarCita(id) {
    return this.citaRepo.buscarPorId(id);
  }
}
const gestionarCitas = new GestionarCitas(medicoRepo, pacienteRepo, citaRepo);
