/**
 * Created by slaughter on 4/18/18.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Medication Schema
var MedicationSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required.'],
        index: true
    },
    description: {
        type: String
    },
    producer: {
        type: String,
        required: [true, 'Producer required.']
    },
    threats: [{type: String}]
});

var Medication = module.exports = mongoose.model('Medication', MedicationSchema);

module.exports.createMedication = function(newMedication, callback){
    // modification and validation of input occurs here
    newMedication.save(callback);
}

module.exports.getMedicationById = function(id, callback){
    Medication.findById(id, callback);
}

module.exports.getMedicationByName = function(name, callback){
    var query = {name: name};
    Medication.findOne(query, callback);
}