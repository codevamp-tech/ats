import { Routes, Route, Outlet } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Home } from './Pages/Employer/Home';
import { Navbar } from './components/Navbar';
import { PostJob } from './components/PostJob/PostJob';
import { AllJobs } from './Pages/Employer/AllJobs';
import { Login } from './components/Login/Login';
import { Register } from './components/Login/Register';
import RecruiterDashboard from './Pages/Recruiter/RecruiterDashboard';
import { CoordinatorDashboard } from './Pages/Coordinator/CoordinatorDashboard';
import { JobDetails } from './components/Home/JobDetails';
import { Applications } from './components/Applications';
import { ShortlistedDetails } from './components/ShortlistedDetails';
import { ApplicationForm } from './Pages/Candidate/ApplicationForm';
import { AssignRecruiter } from './Pages/Coordinator/AssignRecruiter';
import { Footer } from './components/Footer';
import AllPostedJobs from './components/AllPostedJobs'
import { useContext } from 'react';
import { LoginContext } from './components/ContextProvider/Context';
import MyJobs from './Pages/Candidate/MyJobs';
import UserListing from './Pages/User/UserListing';
import InterviewListing from './Pages/InterviewRounds/InterviewListing';
import ApplicationListing from "./Pages/Application/ApplicationListing";
import Dashboard from './Pages/Dashboard';
import Profile from './Pages/Profile/Profile';
import ScheduledInterview from './Pages/ScheduledInterview/ScheduledInterview'
import HiringManagerDashboard from './components/HiringManager/HiringManagerDashboard';
import ManagerApplicationList from './components/HiringManager/ManagerApplicationList'
import AssignedInterviews from './components/HiringManager/AssignedInterviews';
import CandidateApplication from './Pages/Application/CandidateApplication';
import ApplicationJobDetail from './Pages/Application/ApplicationJobDetail';
import CandidateDetailsPage from './Pages/Recruiter/CandidateDetailsPage';
import ShortlistedApplications from './Pages/Application/ShortlistedApplication/ShortlistedApplications';
import { useAuth } from './hooks/useAuth';
import CompanyListing from './Pages/company/CompanyListing';

function App() {
  useAuth();

  return (
    <div className="App">
      <Routes>
        {/* <h1 className='text-5xl text-green-600 '>Hello</h1> */}
        <Route path='/' element={<Navbar />}>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<Home />} />
          <Route path='/post-job' element={<PostJob />} />
          <Route path='/all-jobs' element={<AllJobs />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/all-users' element={<UserListing />} />
          <Route path='/recruiter-dashboard' element={<RecruiterDashboard />} />
          <Route path="/application-types" element={<ApplicationListing />} />
          <Route path='/interview-rounds' element={<InterviewListing />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/all-applications' element={<CandidateApplication />} />
          <Route path='/shortlisted-applications' element={<ShortlistedApplications />} />

          <Route path='/all-companies' element={<CompanyListing />} />

          <Route path='/job-detail/:id' element={<ApplicationJobDetail />} />
          <Route path="/current-job/:id" element={<JobDetails />} />
          <Route path="/application-form/:id" element={<ApplicationForm />} />
          <Route path="/shortlist" element={<Applications />} />
          <Route path='/scheduled-interview' element={<ScheduledInterview />} />
          <Route path="/candidate-details/:candidateId/:jobId" element={<CandidateDetailsPage />} />

          <Route
            path="/shortlist/details/:candidate_id/:job_id"
            element={<ShortlistedDetails />}
          />
          <Route path="/assign-recruiter/:id" element={<AssignRecruiter />} />

          {/* <Route path='/job-detail' element={<JobDetails />}/> */}
          <Route path='/current-job/:id' element={<JobDetails />} />
          <Route path='/application-form/:id' element={<ApplicationForm />} />
          <Route path='/shortlist' element={<Applications />} />
          <Route path='/shortlist/details/:candidate_id/:job_id' element={<ShortlistedDetails />} />
          <Route path='/assign-recruiter/:id' element={<AssignRecruiter />} />
          <Route path='/coordinator/review' element={<CoordinatorDashboard />} />
          {/* <Route path='/dash' element={<Dashboard />} /> */}
          <Route path='/all-posted-jobs' element={<AllPostedJobs />} />
          <Route path='/my-jobs/' element={<MyJobs />} />
          <Route path='/hiring_manager' element={<HiringManagerDashboard />} />
          <Route path='/assigned-interviews' element={<AssignedInterviews />} />
          <Route path='/application-list' element={<ManagerApplicationList />} />


          <Route
            path="/coordinator/review"
            element={<CoordinatorDashboard />}
          />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/all-posted-jobs" element={<AllPostedJobs />} />
          {/* <Route path="/update-job/:id" element={<UpdateJob />} /> */}
          <Route path="/my-jobs/" element={<MyJobs />} />
        </Route >
      </Routes >
      <Footer />
    </div >
  );
}

export default App;
