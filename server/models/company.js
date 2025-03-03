import mongoose from 'mongoose';

const CompanySchema = new mongoose.Schema({

    CompanyUserName: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: Boolean,
        default: false
    },
    website: {
        type: Boolean,
        default: false
    }
});

const Company = mongoose.model('Company', CompanySchema);

export default Company;