import express from "express";
import ApplicationType from "../models/ApplicationType.js";

const router = express.Router();

import { getApplicationTypes } from "../controllers/ApplicationType/getApplicationTypes.js";
import { addApplicationType } from "../controllers/ApplicationType/addApplicationType.js";
import { getApplicationType } from "../controllers/ApplicationType/getApplicationType.js";
import { deleteApplicationType } from "../controllers/ApplicationType/deleteApplicationType.js";
import { updateApplicationType } from "../controllers/ApplicationType/updateApplicationType.js";
import { updateApplicationTypeByCandidate } from "../controllers/ApplicationType/updateApplicationTypeByCandidate.js";

router.get("/all-application-types", getApplicationTypes);
router.post("/add-application-type", addApplicationType);
router.get("/application-type/:id", getApplicationType);
router.delete("/delete-application-type/:id", deleteApplicationType);
router.put("/update-application-type/:id", updateApplicationType);
router.put(
  "/update-application-type-by-candidate/",
  updateApplicationTypeByCandidate
);

export default router;
