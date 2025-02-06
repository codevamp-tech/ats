import mongoose from 'mongoose';

const InterviewerAppSchema = new mongoose.Schema({
    applicationID: {
        type: String,
        required: true,
        ref: 'Job'
    },
    interviewerID: {
        type: String,
        required: true,
        ref: 'User'
    },
});

const InterviewerApp = mongoose.model('InterviewerApp', InterviewerAppSchema);

export default InterviewerApp;