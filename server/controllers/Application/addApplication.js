import Application from "../../models/Application.js";
import upload, { uploadToS3 } from "../../middleware/upload.js";

const addApplication = async (req, res) => {
  const { jobID, candidateID, applicationStatus, contactInfo, experience, questions, answers } = req.body;

  try {
    if (!jobID || !candidateID || !applicationStatus || !contactInfo || !experience) {
      return res.status(400).json({ message: "All required fields must be provided." });
    }

    // Check if resume file exists
    let resumeUrl = null;
    if (req.file) {
      console.log("Received file:", req.file.originalname);
      resumeUrl = await uploadToS3(req.file);
    } else {
      return res.status(400).json({ message: "Resume file is required." });
    }

    // Create a new application entry
    const newApplication = new Application({
      jobID,
      candidateID,
      applicationStatus,
      resume: resumeUrl, // Store S3 file URL
      contactInfo,
      experience,
      questions: questions || [],
      answers: answers || [],
    });

    await newApplication.save();

    res.status(201).json({ message: "Application submitted successfully!", application: newApplication });
  } catch (error) {
    console.error("Error in addApplication:", error);
    res.status(500).json({ message: error.message });
  }
};

// Exporting multer middleware & controller
export { upload, addApplication };
