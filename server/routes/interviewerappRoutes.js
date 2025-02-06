import express from 'express';

const router = express.Router();


import { addInterviewerApp } from "../controllers/InterviewerApp/addInterviewerApp.js"

router.get('/interviewer-app', addInterviewerApp);

export default router;
