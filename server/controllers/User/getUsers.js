// controllers/User/getUsers.js

import User from '../../models/User.js';

const getUsers = async (req, res) => {
  try {
    // Default values for page & limit
    let { page = 1, limit = 10, search = '' } = req.query;

    // Convert page & limit to numbers
    page = parseInt(page);
    limit = parseInt(limit);

    // Build a query for searching userName or email
    const query = {
      $or: [
        { userName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ],
    };

    // Count total documents that match the query
    const totalCount = await User.countDocuments(query);

    // Find users with pagination and search
    const users = await User.find(query)
      .sort( { createdAt: -1 } )
      .skip((page - 1) * limit)
      .limit(limit);

    // Send back users array and totalCount
    res.status(200).json({ 
      users,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get users' });
  }
};

export { getUsers };
