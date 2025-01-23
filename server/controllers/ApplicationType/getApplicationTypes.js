import ApplicationType from "../../models/ApplicationType.js";

const getApplicationTypes = async (req, res) => {
  try {
    // Default values for page & limit
    let { page = 1, limit = 10, search = "" } = req.query;

    // Convert page & limit to numbers
    page = parseInt(page);
    limit = parseInt(limit);

    // Build a query for searching application types
    const query = {
      applicationStep: { $regex: search, $options: "i" }, // Assuming 'name' is a field in ApplicationType
      applicationStatus: { $regex: search, $options: "i" },
    };

    // Count total documents that match the query
    const totalCount = await ApplicationType.countDocuments(query);

    // Find application types with pagination and search
    const applicationTypes = await ApplicationType.find(query)
      .skip((page - 1) * limit)
      .limit(limit);

    // Send back application types array and totalCount
    res.status(200).json({
      applicationTypes,
      totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to get application types" });
  }
};

export { getApplicationTypes };
