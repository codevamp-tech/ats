import React from "react";
import { Line } from "react-chartjs-2";
import {
    UserPlus,
    CheckCircle,
    Briefcase,
    XCircle,
    Users,
    TrendingUp,
    Calendar,
    ClipboardList,
    Activity,
} from "lucide-react";

// Chart.js Configuration
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const RecruiterDashboard = () => {
    const chartData = {
        labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
        datasets: [
            {
                label: "Applications",
                data: [64, 85, 95, 100],
                borderColor: "#6C5DD3",
                backgroundColor: "rgba(108, 93, 211, 0.2)",
                tension: 0.4,
            },
            {
                label: "Shortlisted",
                data: [50, 70, 80, 90],
                borderColor: "#34D399",
                backgroundColor: "rgba(52, 211, 153, 0.2)",
                tension: 0.4,
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: "top" },
            tooltip: { enabled: true },
        },
    };

    const stats = [
        { title: "Applications", value: "12.2K", trend: "+5%", bg: "bg-gradient-to-r from-purple-500 to-indigo-500", icon: <Users className="w-6 h-6" /> },
        { title: "Shortlisted", value: "11.1K", trend: "+14%", bg: "bg-gradient-to-r from-green-500 to-teal-500", icon: <CheckCircle className="w-6 h-6" /> },
        { title: "Hired", value: "2.3K", trend: "+8%", bg: "bg-gradient-to-r from-blue-500 to-cyan-500", icon: <Briefcase className="w-6 h-6" /> },
        { title: "Rejected", value: "5.6K", trend: "-3%", bg: "bg-gradient-to-r from-red-500 to-pink-500", icon: <XCircle className="w-6 h-6" /> },
    ];

    const applicants = [
        { name: "Douglas Ray", job: "iOS Developer", status: "Shortlisted" },
        { name: "Elizabeth Martin", job: "Full Stack Developer", status: "Interview Scheduled" },
        { name: "Emma Wade", job: "Product Designer", status: "Applied" },
        { name: "Teresa Reyes", job: "Design Lead", status: "Hired" },
        { name: "Crystal Austin", job: "Marketing Manager", status: "Rejected" },
    ];

    const interviews = [
        { candidate: "Douglas Ray", position: "iOS Developer", date: "2025-01-30", time: "10:00 AM" },
        { candidate: "Emma Wade", position: "Product Designer", date: "2025-02-02", time: "2:00 PM" },
    ];

    const jobs = [
        { title: "Frontend Developer", active: true, applications: 120 },
        { title: "Backend Engineer", active: false, applications: 80 },
        { title: "UI/UX Designer", active: true, applications: 95 },
    ];

    return (
        <>
            <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                {/* Header */}
                <header className="bg-gradient-to-r from-purple-600 to-blue-500 text-white py-4 px-8 shadow-2xl">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl font-bold flex items-center space-x-3">
                            <TrendingUp className="text-yellow-300 w-8 h-8 animate-bounce" />
                            <span>Recruiter Dashboard</span>
                        </h1>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 p-8">
                    {/* Stats Section */}
                    <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className={`${stat.bg} text-white backdrop-blur-lg bg-opacity-20 shadow-2xl p-6 rounded-2xl hover:scale-105 transform transition duration-300 ease-in-out hover:shadow-3xl`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="text-white p-3 bg-white/20 rounded-full hover:rotate-12 transition-transform">
                                        {stat.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold">{stat.title}</h3>
                                </div>
                                <p className="text-4xl font-bold my-3">{stat.value}</p>
                                <span
                                    className={`py-1 px-3 rounded-full text-sm font-medium ${stat.trend.includes("+") ? "bg-green-700" : "bg-red-700"
                                        }`}
                                >
                                    {stat.trend}
                                </span>
                            </div>
                        ))}
                    </section>

                    {/* Application Trends */}
                    <section className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-8">
                        <div className="lg:col-span-2 bg-white backdrop-blur-lg bg-opacity-20 shadow-2xl p-6 rounded-2xl">
                            <h2 className="text-xl font-bold text-gray-700 mb-6 flex items-center">
                                <Activity className="mr-3 text-purple-600 w-6 h-6 animate-pulse" /> Application Trends
                            </h2>
                            <Line data={chartData} options={chartOptions} />
                        </div>

                        {/* Hiring Pipeline */}
                        <div className="lg:col-span-1 bg-white backdrop-blur-lg bg-opacity-20 shadow-2xl p-6 rounded-2xl">
                            <h2 className="text-xl font-bold text-green-700 mb-6 flex items-center">
                                <ClipboardList className="mr-3 text-green-600 w-6 h-6 animate-pulse" /> Hiring Pipeline
                            </h2>
                            <ul className="space-y-4">
                                <li className="flex items-center justify-between py-2">
                                    <span>Applied</span>
                                    <span className="font-bold text-blue-500">64%</span>
                                </li>
                                <li className="flex items-center justify-between py-2">
                                    <span>Shortlisted</span>
                                    <span className="font-bold text-green-500">24%</span>
                                </li>
                                <li className="flex items-center justify-between py-2">
                                    <span>Hired</span>
                                    <span className="font-bold text-purple-500">12%</span>
                                </li>
                            </ul>
                        </div>

                        {/* New Applicants */}
                        <div className="lg:col-span-1 bg-white backdrop-blur-lg bg-opacity-20 shadow-2xl p-6 rounded-2xl">
                            <h2 className="text-xl font-bold text-gray-700 mb-6 flex items-center">
                                <UserPlus className="mr-3 text-blue-600 w-6 h-6 animate-pulse" /> New Applicants
                            </h2>
                            <ul className="space-y-4">
                                {applicants.map((applicant, index) => (
                                    <li key={index} className="border-b border-gray-200 pb-3">
                                        <p className="font-semibold text-gray-700">{applicant.name}</p>
                                        <p className="text-sm text-gray-500">{applicant.job}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Upcoming Interviews and Job Postings */}
                    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                        <div className="lg:col-span-2 bg-white backdrop-blur-lg bg-opacity-20 shadow-2xl p-6 rounded-2xl">
                            <h2 className="text-xl font-bold text-gray-700 mb-6 flex items-center">
                                <Calendar className="mr-3 text-orange-600 w-6 h-6 animate-pulse" /> Upcoming Interviews
                            </h2>
                            <ul className="space-y-4">
                                {interviews.map((interview, index) => (
                                    <li
                                        key={index}
                                        className="flex justify-between items-center border-b border-gray-200 pb-3"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-700">{interview.candidate}</p>
                                            <p className="text-sm text-gray-500">{interview.position}</p>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {interview.date} - {interview.time}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="bg-white backdrop-blur-lg bg-opacity-20 shadow-2xl p-6 rounded-2xl">
                            <h2 className="text-xl font-bold text-gray-700 mb-6 flex items-center">
                                <Briefcase className="mr-3 text-blue-500 w-6 h-6 animate-pulse" /> Job Postings
                            </h2>
                            <ul className="space-y-4">
                                {jobs.map((job, index) => (
                                    <li key={index} className="border-b border-gray-200 pb-3">
                                        <p className="font-semibold text-gray-700">{job.title}</p>
                                        <p className="text-sm text-gray-500">
                                            {job.active ? "Active" : "Closed"} - {job.applications} Applications
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                </main>
            </div>
        </>
    );
};

export default RecruiterDashboard;


