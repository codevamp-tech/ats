// controllers/applicationController.js

import Application from '../../models/Application.js';

/**
 * GET /api/applications/job/:jobId
 * Query Params: page (default: 1), limit (default: 10), search (optional)
 */
const getApplicationsByJobId = async (req, res) => {
  try {
    // Extract jobId from route params
    const { jobId } = req.params;
    
    // Extract query parameters, provide defaults
    let { page = 1, limit = 10, search = '' } = req.query;
    
    // Convert page and limit to integers
    page = parseInt(page, 10);
    limit = parseInt(limit, 10);

    // Build the filter object
    const filter = { jobID: jobId };

    // Example: If you want to allow searching by applicationStatus
    if (search) {
      filter.applicationStatus = { $regex: search, $options: 'i' };
    }

    // Get total count of matching documents for pagination
    const total = await Application.countDocuments(filter);
    const skip = (page - 1) * limit;

    // Fetch the applications
    const applications = await Application.find(filter)
      .populate('candidateID') // Adjust populates to your needs
      .populate('jobID')
      .skip(skip)
      .limit(limit);

    // Respond with paginated data
    return res.status(200).json({
      applications,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalApplications: total
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};

export { getApplicationsByJobId };
