const mongoose = require('../../database');

const ChatSchema = new mongoose.Schema({
    idChat: {
      type: String,
      require: true
    },
    response: {
        type: Array,
        require:true
    },
    consulta: {
      type: Object,
      require:true
    },
    createdAt: {
      type: Date,
      default: Date.now,
  },
});


const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;