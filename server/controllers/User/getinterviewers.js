import User from '../../models/User.js';

const getInterviewers = async (req, res) => {
    try {
        const interviewers = await User.find({ role: "interviewer" });

        res.status(200).json(interviewers);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get interviewers' });
    }
};

export { getInterviewers };
