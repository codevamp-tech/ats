import express from 'express';
import Application from '../models/Application.js';

const router = express.Router();

import { upload, addApplication } from '../controllers/Application/addApplication.js';
import { getCandidateApplications } from '../controllers/Application/applicationController.js';
import { getApplications } from '../controllers/Application/getApplications.js';
import { getApplication } from '../controllers/Application/getApplication.js';

router.post("/add-application", upload.single("resume"), addApplication);
router.get('/get-application/:id', getApplication);
router.get('/all-application/', getApplications);
router.get('/candidate/:candidateId', getCandidateApplications);

export default router;