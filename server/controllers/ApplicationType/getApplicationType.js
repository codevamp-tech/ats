import ApplicationType from "../../models/ApplicationType.js";

const getApplicationType = async (req, res) => {
  try {
    const applicationTypeId = req.params.id;
    const applicationType = await ApplicationType.findById(applicationTypeId);
    res.status(200).json(applicationType);
  } catch (error) {
    res.status(500).json({ message: "Failed to get application" });
  }
};

export { getApplicationType };
