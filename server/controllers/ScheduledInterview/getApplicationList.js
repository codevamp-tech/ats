import InterviewSchedule from "../../models/Applicationlist.js";

// Function to fetch interviews
export const getInterviews = async (req, res) => {
    try {
        const interviews = await InterviewSchedule.find().populate({
            path: 'applicationID',
            select: 'jobID',
            populate: [
                {
                    path: 'jobID',
                    select: 'title' // Selecting only the title from Job model
                },
                {
                    path: 'candidateID',
                    select: 'userName' // Selecting only the title from Job model
                },
            ],
            // populate:{
            //     path: 'candidateID',
            //     select: 'userName'
            // }
        });
        res.status(200).json(interviews);
    } catch (error) {
        console.error("Error fetching interviews:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export default getInterviews;