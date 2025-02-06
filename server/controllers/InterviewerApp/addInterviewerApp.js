import InterviewerApp from "../../models/InterviewerApp.js";

const addInterviewerApp = async (req, res) => {
    const { applicationID, interviewerID } = req.body;

    try {
        if (!applicationID || !interviewerID) {
            return res.status(400).json({ message: "Application ID and Interviewer ID are required." });
        }

        // Create a new application entry
        const newApplication = new InterviewerApp({
            applicationID,
            interviewerID,
        });

        await newApplication.save();

        res.status(201).json({ message: "Application submitted successfully!", application: newApplication });
    } catch (error) {
        console.error("Error in addApplication:", error);
        res.status(500).json({ message: error.message });
    }
};

export { addInterviewerApp };

