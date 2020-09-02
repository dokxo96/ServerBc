const mongoose = require('mongoose');

const CertPendienteSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    file : {
        type : Buffer,
        required : true
    }
});

module.exports = mongoose.model('CertPendiente', CertPendienteSchema);