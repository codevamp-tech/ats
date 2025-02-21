import Job from '../../models/Job.js';

const getJobs = async (req, res) => {
    try {
        const { page = 1, limit = 3, search, type, locationType, scheduleType } = req.query;

        let query = {};

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
            ];
        }

        if (type && type !== "") {
            query.type = type;
        }
        if (locationType && locationType !== "") {
            query.locationType = locationType;
        }
        if (scheduleType && scheduleType !== "") {
            query.scheduleType = scheduleType;
        }

        const pageInt = parseInt(page, 10) || 1;
        let limitInt = parseInt(limit, 10);
        if (isNaN(limitInt) || limitInt <= 0) limitInt = 3;

        const startIndex = (pageInt - 1) * limitInt;
        const total = await Job.countDocuments(query);

        const jobs = await Job.find(query).skip(startIndex).limit(limitInt);

        if (!Array.isArray(jobs)) {
            return res.status(500).json({ message: "Unexpected response format from database" });
        }

        res.status(200).json({
            jobs,
            totalPages: Math.ceil(total / limitInt),
            currentPage: pageInt,
        });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ message: error.message });
    }
};

export { getJobs };
