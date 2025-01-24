import Job from '../../models/Job.js';
import uniqid from 'uniqid';

const addJob = async (req, res) => {
    const {
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

    console.log("Data on backend", req.body);

    const job = new Job({
        jobID: uniqid(),
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
    });

    try {
        await job.save();
        res.status(201).json(job);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export { addJob };
