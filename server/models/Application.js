import mongoose from 'mongoose';

const ApplicationSchema = new mongoose.Schema({
    jobID: {
        type: String,
        required: true,
        ref: 'Job'
    },
    candidateID: {
        type: String,
        required: true,
        ref: 'User'
    },
    applicationStatus: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,
    },
    contactInfo:{
        type: String,
        required: true,
    },
    experience:{
        type: String,
        required: true,
    },
    questions:{
        type: Array,
        required: false,
    },
    answers:{
        type: Array,
        required: false,
    }
},
    { timestamps: true } 
);

const Application = mongoose.model('Application', ApplicationSchema);

export default Application;