const mongoose = require('../../database');

const PacienteSchema = new mongoose.Schema({
    name: {
        type: String,
        require:true
    },
    cpf: {
      type: String,
      require:true
    },
    plano: {
      type: Number,
      require:true,
      default: 21573
    },
    createdAt: {
      type: Date,
      default: Date.now,
  },
});


const Paciente = mongoose.model('Paciente', PacienteSchema);

module.exports = Paciente;