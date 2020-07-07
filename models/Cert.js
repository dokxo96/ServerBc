const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const CertSchema = new mongoose.Schema({{

    cert :{
        type :String,
        require=true
    },
    certhash:{
        type: String,
        require=true
    }
});

module.exports = mongoose.model('Cert',CertSchema);