const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const CanvasSchema = mongoose.Schema({
  canvas: {
    type: String,
    default: "simple"
  }

});



const Canvas = mongoose.model('Canvas', CanvasSchema);

module.exports = {Canvas};
