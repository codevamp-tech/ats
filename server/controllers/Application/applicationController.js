// controllers/applicationController.js
import Application from '../../models/Application.js';

const getCandidateApplications = async (req, res) => {
    try {
        // Extract the candidate ID from URL parameters (e.g., /api/applications/candidate/:candidateId)
        const { candidateId } = req.params;
        console.log("candidate", candidateId);

        // Fetch applications where candidateID == candidateId
        // Then populate candidateID with the candidate's data
        // and jobID with the job's data
        const applications = await Application.find({ candidateID: candidateId })
            .populate('candidateID')
            .populate('jobID');    

        res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { getCandidateApplications };
