/**
 * Created by slaughter on 4/18/18.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Prescription Schema
var PrescriptionSchema = mongoose.Schema({
    dosage: {
        type: String,
        required: [true, 'Dosage required.']
    },
    expiration: {
        type: Date,
        required: [true, 'Expiration required.'],
        default: Date.now()
    },
    refills: {
        type: Number,
        required: [true, 'Refills required.'],
        min: [0, 'Cannot have negative refills.'],
        default: 0
    },
    threats: [{type: String}]
});

var Prescription = module.exports = mongoose.model('Prescription', PrescriptionSchema);

module.exports.createPrescription = function(newPrescription, callback){
    // modification and validation of input occurs here
    newPrescription.save(callback);
}

module.exports.getPrescriptionById = function(id, callback){
    Prescription.findById(id, callback);
}