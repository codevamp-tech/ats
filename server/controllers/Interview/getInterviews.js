// controllers/User/getUsers.js

import Interview from '../../models/Interview.js';


const getInterviews = async (req, res) => {
  try {
    // Default values for page & limit
    let { page = 1, limit = 10, search = '' } = req.query;

    // Convert page & limit to numbers
    page = parseInt(page);
    limit = parseInt(limit);

    // Build a query for searching userName or email
    const query = {
      $or: [
        { roundName: { $regex: search, $options: 'i' } },
        { roundNumber: { $regex: search, $options: 'i' } },
      ],
    };

    // Count total documents that match the query
    const totalCount = await Interview.countDocuments(query);

    // Find interview with pagination and search
    const interviews = await Interview.find(query)
      .sort( { createdAt: -1 } )
      .skip((page - 1) * limit)
      .limit(limit);

    // Send back interviews array and totalCount
    res.status(200).json({
      interviews,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get interviews' });
  }
};

export { getInterviews };
