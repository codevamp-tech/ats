import File from "../models/File.js";
import dbConnect from "../lib/dbConnect.js";

export const uploadFile = async (req, res) => {
    try {
        await dbConnect();

        const fileData = {
            filename: req.file.originalname,
            mimetype: req.file.mimetype,
            size: req.file.size,
            file: req.file.buffer,
        };

        const newFile = new File(fileData);
        await newFile.save();

        res.status(200).json({ message: "File uploaded successfully", fileId: newFile._id });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
};

export const getFile = async (req, res) => {
    try {
        await dbConnect();

        const file = await File.findById(req.query.id);
        if (!file) {
            return res.status(404).json({ error: "File not found" });
        }

        res.setHeader("Content-Type", file.mimetype);
        res.send(file.file);
    } catch (error) {
        console.error("Error fetching file:", error);
        res.status(500).json({ error: "Failed to fetch file" });
    }
};
