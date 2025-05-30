import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/login");
    };

    return (
        <div className="relative overflow-hidden bg-slate-900 text-white">
            <div className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-[85vh]">
                {/* Text Section */}
                <div className="w-full lg:w-1/2 px-6 py-10 lg:py-20 flex flex-col items-center text-center lg:text-left space-y-6">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                        Your <span className="text-blue-500">Jobify</span> Recruiter for
                        <br className="hidden sm:block" /> end-to-end Hiring
                    </h1>
                    <p className="text-base sm:text-lg max-w-xl">
                        AI-powered screening and assessments: find and interview top
                        candidates from 100+ platforms and hire in 24 hours, all at 10% of
                        the cost.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                        <button
                            onClick={handleClick}
                            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-green-400"
                        >
                            <span className="flex items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-2"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Try for Free
                            </span>
                        </button>

                        <button className="bg-[#0288d1] text-white px-6 py-3 rounded-full text-base sm:text-lg font-semibold hover:bg-[#026aa7] transition-all duration-300 transform hover:scale-105">
                            Explore the Expertia Difference
                        </button>
                    </div>
                </div>

                {/* Image Section */}
                <div className="w-full lg:w-1/2 px-4 mb-10 lg:mb-0">
                    <img
                        src="banner2.png"
                        alt="Banner"
                        className="w-full h-auto max-h-[85vh] object-contain mx-auto"
                    />
                </div>
            </div>
        </div>
    );
};

export default Banner;
