// controllers/ApplicationType/updateApplicationType.js

import ApplicationType from "../../models/ApplicationType.js";
// import bcrypt from "bcryptjs";

const updateApplicationType = async (req, res) => {
  try {
    const { id } = req.params;
    const { applicationStep, applicationStatus } = req.body;

    const applicationType = await ApplicationType.findById(id);
    if (!applicationType) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Update only if the field is provided, else keep existing
    if (applicationStep !== undefined)
      applicationType.applicationStep = applicationStep;
    if (applicationStatus !== undefined)
      applicationType.email = applicationStatus;

    await applicationType.save();

    res.status(200).json({ success: true, data: applicationType });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { updateApplicationType };
