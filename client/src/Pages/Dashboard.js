import React from 'react';
import Stats from "../components/Stats";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
// import Header from '../components/Header';
import Particles from "../components/Login/Particles"

export default function Dashboard() {
    // Mock data for charts
    const jobApplications = [
        { job: "Software Engineer", applications: 50 },
        { job: "Product Manager", applications: 30 },
        { job: "Data Analyst", applications: 40 },
        { job: "UX Designer", applications: 25 },
        { job: "Marketing Specialist", applications: 35 },
    ];

    const dailyApplications = [
        { date: "2023-07-01", applications: 10 },
        { date: "2023-07-02", applications: 15 },
        { date: "2023-07-03", applications: 8 },
        { date: "2023-07-04", applications: 12 },
        { date: "2023-07-05", applications: 20 },
        { date: "2023-07-06", applications: 18 },
        { date: "2023-07-07", applications: 25 },
    ];

    return (
        <div className="relative h-auto w-screen flex items-center justify-center">
            {/* Add ParticlesComponent as the background */ }
            <div className="absolute top-0 left-0 w-full h-full -z-10">
                <Particles />
            </div>
            <div className="min-h-screen bg-transparent p-4 md:p-8">
                <div className="max-w-7xl mx-auto">
                    {/* <div> <Header /></div> */ }
                    <header className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-serif text-gray-800">ATS Admin Dashboard</h1>
                        <div className="flex items-center space-x-4">
                            <div className="text-sm text-clearWhite">
                                { new Date().toLocaleDateString( 'en-US', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                } ) }
                            </div>
                        </div>
                    </header>

                    <Stats />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Applications per Job</h2>
                                <span className="text-sm text-gray-500">Last 30 Days</span>
                            </div>
                            <BarChart data={ jobApplications } />
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold text-gray-800">Daily Applications</h2>
                                <span className="text-sm text-gray-500">Weekly Trend</span>
                            </div>
                            <LineChart data={ dailyApplications } />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}