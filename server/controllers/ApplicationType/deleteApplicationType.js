import ApplicationType from "../../models/ApplicationType.js";

const deleteApplicationType = async (req, res) => {
  try {
    const { id } = req.params;
    await ApplicationType.findByIdAndDelete(id);
    res.status(200).json({ message: "Application deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete application", error });
  }
};

export { deleteApplicationType };
