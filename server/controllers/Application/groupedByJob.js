// controllers/applicationController.js

import Application from '../../models/Application.js';

const getAllApplicationsGroupedByJob = async (req, res) => {
  try {
    let { page = 1, limit = 10, search = '' } = req.query;
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    // Example filter object for searching by 'status'
    const filter = {};
    if (search) {
      filter.status = { $regex: search, $options: 'i' };
    }

    // 1) Get ALL distinct jobIDs matching filter
    const allDistinctJobIDs = await Application.distinct('jobID', filter);
    const totalJobs = allDistinctJobIDs.length;

    // 2) Apply pagination on jobIDs
    const skip = (page - 1) * limit;
    const paginatedJobIDs = allDistinctJobIDs.slice(skip, skip + limit);

    // 3) For each jobID, find the applications and populate them
    const groupedDataPromises = paginatedJobIDs.map(async (jobId) => {
      const jobApplications = await Application.find({ jobID: jobId, ...filter })
        .populate('candidateID')
        .populate('jobID');
      
      return {
        jobID: jobId,
        applications: jobApplications
      };
    });

    const groupedData = await Promise.all(groupedDataPromises);

    // 4) Return grouped data with pagination info
    return res.status(200).json({
      totalJobs,
      totalPages: Math.ceil(totalJobs / limit),
      currentPage: page,
      data: groupedData
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export { getAllApplicationsGroupedByJob };
