/**
 * Created by slaughter on 4/18/18.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Doctor Schema
var DoctorSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name required.']
    },
    lastName: {
        type: String,
        required: [true, 'Last Name required.']
    },
    birthDate: {
        type: Date,
        required: [true, 'Birth Date required.']
    },
    specialty: {
        type: String,
        enum: ['Neurology', 'Psychology', 'Psychiatry', 'Pediatrics', 'Surgery', 'Cardiology', 'Radiology'],
        required: [true, 'Specialty required.']
    },
    startDate: {
        type: Date,
        required: [true, 'Start Date required.'],
        default: Date.now()
    }
});

var Doctor = module.exports = mongoose.model('Doctor', DoctorSchema);

module.exports.createDoctor = function(newDoctor, callback){
    // modification and validation of input occurs here
    newDoctor.save(callback);
}

module.exports.getDoctorById = function(id, callback){
    Doctor.findById(id, callback);
}