const mongoose = require('mongoose');

const CertSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    hash : {
        type : String,
        required : true
    }
    ,hashIpfs : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('Cert',CertSchema);