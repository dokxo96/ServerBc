const mongoose = require('mongoose');

const CertSchema = new mongoose.Schema({
    hash : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Cert',CertSchema);