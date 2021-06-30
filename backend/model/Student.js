const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//monggose

// Define collection and schema
let Student = new Schema({
  id_number: {
    type: String
  },
  full_name: {
    type: String
  },
  department: {
    type: String
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  height: {
    type: String
  },
  birth_date: {
    type: Date
  },
  gender: {
    type: String
  }
}, {
  collection: 'students'
})

module.exports = mongoose.model('Student', Student)