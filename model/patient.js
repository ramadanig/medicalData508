/**
 * Created by slaughter on 4/18/18.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Patient Schema
var PatientSchema = mongoose.Schema({
    ssn: {
        type: String,
        index: true,
        required: [true, 'SSN required.']
    },
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
    sex: {
        type: String,
        enum: ['Male', 'Female'],
        default: 'Male',
        required: [true, 'Sex required.']
    },
    address: {
        type: String,
        required: [true, 'Address required.']
    },
    phone: {
        type: String
    },
    allergies: [{type: String}]
});

var Patient = module.exports = mongoose.model('Patient', PatientSchema);

module.exports.createPatient = function(newPatient, callback){
    // modification and validation of input occurs here
    newPatient.save(callback);
}

module.exports.getPatientBySsn = function(ssn, callback){
    var query = {ssn: ssn};
    Patient.findOne(query, callback);
}

module.exports.getPatientById = function(id, callback){
    Patient.findById(id, callback);
}