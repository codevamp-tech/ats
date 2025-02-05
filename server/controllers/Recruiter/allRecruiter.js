import User from '../../models/User.js'

const allRecruiter = async (req, res) => {
    try {
        // const recID = req.params.id;
        const recruiter = await User.find({ role : 'recruiter_manager', head: false });
        res.status(200).json(recruiter);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export {allRecruiter};