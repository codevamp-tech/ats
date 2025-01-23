import mongoose from "mongoose";

const ApplicationTypeSchema = new mongoose.Schema({
  applicationStep: {
    type: String,
    required: true,
  },
  applicationStatus: {
    type: String,
    required: true,
  },
});

const ApplicationType = mongoose.model(
  "ApplicationType",
  ApplicationTypeSchema
);

export default ApplicationType;
