const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const SimpleSchema = mongoose.Schema({
  simple: {
    type: String,
    default: "simple"
  }

});



const Simple = mongoose.model('Simple', SimpleSchema);

module.exports = {Simple};
