const mongoose = require('mongoose')

const CertificateSchema = new mongoose.Schema({
    keyPem: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    collection: 'Certificates'
})

module.exports = mongoose.model('Certificate', CertificateSchema)