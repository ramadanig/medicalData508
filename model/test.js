/**
 * Created by slaughter on 4/18/18.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Test Schema
var TestSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required.']
    },
    data: [{
        type: String,
        required: [true, 'Data required.']
    }],
    results: [{
        type: String,
        required: [true, 'Results required.']
    }]
});

var Test = module.exports = mongoose.model('Test', TestSchema);

module.exports.createTest = function(newTest, callback){
    // modification and validation of input occurs here
    newTest.save(callback);
}

module.exports.getTestById = function(id, callback){
    Test.findById(id, callback);
}