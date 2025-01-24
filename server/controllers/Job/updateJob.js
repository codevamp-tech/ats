import Job from '../../models/Job.js';

const updateJob = async (req, res) => {
    try {
        const {
            _id,
            // Directly mapping to the Job schema fields
            title,
            locationType,
            type,
            scheduleType,
            shiftStart,
            shiftEnd,
            hireType,
            country,
            state,
            city,
            description,
            compensation,
            experienceRequired,
            requiredResources,
            status,
            recruiterName,
            hiringManagerEmail,
            hiringManagerName,
            applicationForm,
            applicants
        } = req.body;

        const updatedJob = await Job.findByIdAndUpdate(
            _id,
            {
                title,
                locationType,
                type,
                scheduleType,
                shiftStart,
                shiftEnd,
                hireType,
                country,
                state,
                city,
                description,
                compensation,
                experienceRequired,
                requiredResources,
                status,
                recruiterName,
                hiringManagerEmail,
                hiringManagerName,
                applicationForm,
                applicants
            },
            { new: true }
        );

        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export { updateJob };
