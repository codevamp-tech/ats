import React, { useState, useEffect, useRef } from 'react';

function About() {
    const [activeTab, setActiveTab] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const timerRef = useRef(null);

    const tabs = [
        { id: 'jobify', label: 'Jobify', icon: '🔍' },
        { id: 'jobify-screening', label: 'Screening', icon: '🤖' },
        { id: 'talent-pool', label: 'Talent Pool', icon: '👥' },
        { id: 'interviews', label: 'Interviews', icon: '💬' },
        { id: 'tracking', label: 'Tracking', icon: '📊' },
    ];

    const carouselContent = [
        {
            title: 'About Jobify',
            description:
                "Find the best job's from multiple channels with our advanced AI algorithms.",
            tags: ['#Application Tracking System', '#multichannel'],
            cta: 'Try For Free',
            color: 'from-blue-500 to-purple-600',
            video: 'vedio1.mp4',
        },
        {
            title: 'Jobify Screening',
            description:
                "Let our advanced algorithms find the most relevant job's, saving you time and effort.",
            tags: ['#biasfree', '#culturefit'],
            cta: 'Try For Free',
            color: 'from-purple-500 to-indigo-600',
            video: 'vedio1.mp4',
        },
        {
            title: 'Talent Pool Management',
            description:
                'Organize and nurture your talent pool with AI-powered insights and automation.',
            tags: ['#organization', '#engagement'],
            cta: 'Try For Free',
            color: 'from-green-500 to-teal-600',
            video: 'vedio2.mp4',
        },
        {
            title: 'Streamlined Interviews',
            description:
                'Schedule and conduct interviews efficiently with our integrated platform.',
            tags: ['#scheduling', '#feedback'],
            cta: 'Try For Free',
            color: 'from-orange-500 to-red-600',
            video: 'vedio1.mp4',
        },
        {
            title: 'Candidate Tracking',
            description:
                'Monitor candidate progress and make data-driven decisions with our tracking tools.',
            tags: ['#pipeline', '#analytics'],
            cta: 'Try For Free',
            color: 'from-pink-500 to-rose-600',
            video: 'vedio2.mp4',
        },
    ];

    // Auto-scroll
    useEffect(() => {
        const startTimer = () => {
            timerRef.current = setInterval(() => {
                if (!isHovering) {
                    setActiveTab((prev) => (prev + 1) % tabs.length);
                }
            }, 5000);
        };
        startTimer();
        return () => clearInterval(timerRef.current);
    }, [isHovering]);

    return (
        <div className="w-full py-6 bg-slate-900/50">
            {/* Tabs */}
            <div className="flex justify-center mb-6 overflow-x-auto">
                <div className="flex space-x-6 sm:space-x-8 px-4 h-28 items-center">
                    {tabs.map((tab, index) => (
                        <button
                            key={tab.id}
                            className="flex flex-col items-center relative group"
                            onClick={() => setActiveTab(index)}
                        >
                            <div
                                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-2 transition-all duration-300 transform ${activeTab === index
                                    ? `bg-gradient-to-br ${carouselContent[index].color} text-white shadow-lg scale-110`
                                    : 'bg-gray-100 text-black group-hover:bg-gray-200'
                                    }`}
                            >
                                <span className="text-xl">{tab.icon}</span>
                            </div>
                            <span
                                className={`text-xs font-medium transition-colors duration-300 ${activeTab === index
                                    ? 'text-amber-500'
                                    : 'text-white group-hover:text-white'
                                    }`}
                            >
                                {tab.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Carousel */}
            <div
                className="relative flex flex-col md:flex-row items-center gap-8 px-4 sm:px-8 lg:px-16"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Gradient background overlay */}
                <div
                    className={`absolute inset-0 bg-gradient-to-br ${carouselContent[activeTab].color} opacity-5 rounded-3xl pointer-events-none`}
                />

                {/* Left content */}
                <div className="w-full md:w-1/2 text-center md:text-left space-y-6 z-10">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                        {carouselContent[activeTab].title}
                    </h2>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                        {carouselContent[activeTab].tags.map((tag, i) => (
                            <span
                                key={i}
                                className={`text-sm px-3 py-1 rounded-full bg-gradient-to-r ${carouselContent[activeTab].color} bg-opacity-10 text-white`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <p className="text-sm sm:text-base text-white">
                        {carouselContent[activeTab].description}
                    </p>

                    <div className="flex justify-center md:justify-start">
                        <button
                            className={`bg-gradient-to-r ${carouselContent[activeTab].color} text-white px-6 py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                        >
                            {carouselContent[activeTab].cta}
                        </button>
                    </div>
                </div>

                {/* Right video */}
                <div className="w-full md:w-1/2 z-10 mt-8 md:mt-0">
                    <div className="rounded-2xl overflow-hidden shadow-xl">
                        <video
                            className="w-full max-h-[250px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-[500px] object-cover"
                            controls
                            autoPlay
                            muted
                            loop
                        >
                            <source
                                src={carouselContent[activeTab]?.video}
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default About;
