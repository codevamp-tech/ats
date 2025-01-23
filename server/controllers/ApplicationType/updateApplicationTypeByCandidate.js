import ApplicationType from "../../models/ApplicationType.js";

const updateApplicationTypeByCandidate = async (req, res) => {
  try {
    const { jobID, candidateID, status } = req.body;

    // Log the request body for debugging
    console.log("Update application type by candidate");
    console.log(req.body);

    // Find the application type by candidateID and update it
    const updatedApplicationType = await ApplicationType.findByIdAndUpdate(
      candidateID,
      {
        $push: {
          applications: {
            jobID: jobID,
            candidateID: candidateID,
            status: status,
          },
        },
      },
      { new: true } // To return the updated document
    );

    if (!updatedApplicationType) {
      return res.status(404).json({ error: "Application type not found" });
    }

    res.status(200).json(updatedApplicationType);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to update application type by candidate" });
  }
};

export { updateApplicationTypeByCandidate };
