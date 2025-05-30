import { useState, useEffect } from 'react';

export default function WhyAts() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div
      className={`min-h-screen bg-transparent font-sans transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
    >
      {/* Hero Section */}
      <div className="pt-20 pb-12 px-4 sm:px-8 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Why you should{' '}
              <span className="text-blue-500 relative inline-block">
                Choose A.T.S?
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-300 rounded-full translate-y-1"></span>
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
              Full stack of hiring – 1 platform to manage over 100 partner platforms.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mt-12">
            {/* Stat Cards */}
            {[
              { title: '22 M', subtitle: 'Job Candidates', detail: '(Jan 2025)' },
              { title: '88%', subtitle: 'Accuracy -', detail: 'AI Recommendations' },
              { title: '90%', subtitle: 'Time Saved', detail: 'As low as 24 hours' },
              { title: '10%', subtitle: 'Effective Costs', detail: 'As low as $100' },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-blue-300 mb-3">
                  {stat.title}
                </div>
                <div className="text-base sm:text-lg text-white">{stat.subtitle}</div>
                <div className="text-sm text-blue-300">{stat.detail}</div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="mt-12 sm:mt-16 text-center">
            <button className="px-6 sm:px-8 py-3 bg-gray-400 border-2 border-white text-white rounded-full hover:bg-gray-500 hover:text-white transition-all shadow-md hover:shadow-lg text-base sm:text-lg font-medium">
              Request a Free Demo
            </button>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-3/4 right-1/4 w-48 sm:w-64 h-48 sm:h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: scale(1) translate(0px, 0px);
          }
          33% {
            transform: scale(1.1) translate(40px, -40px);
          }
          66% {
            transform: scale(0.9) translate(-40px, 40px);
          }
          100% {
            transform: scale(1) translate(0px, 0px);
          }
        }
        .animate-blob {
          animation: blob 7s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}



