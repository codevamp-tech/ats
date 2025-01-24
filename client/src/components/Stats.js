import React from 'react';

export default function Stats() {
  const stats = [
    { 
      label: "Total Applications", 
      value: "1,234",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306 11.355-11.355" />
        </svg>
      ),
      color: "bg-blue-50",
      textColor: "text-blue-600"
    },
    { 
      label: "Open Positions", 
      value: "15",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 1-3.413-.387 2.18 2.18 0 0 1-1.162-1.483A2.247 2.247 0 0 0 12 5.25v-.896" />
        </svg>
      ),
      color: "bg-green-50",
      textColor: "text-green-600"
    },
    { 
      label: "Interviews Scheduled", 
      value: "42",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
      ),
      color: "bg-purple-50",
      textColor: "text-purple-600"
    },
    { 
      label: "Offers Extended", 
      value: "8",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      color: "bg-orange-50",
      textColor: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`
            ${stat.color} 
            p-5 rounded-xl shadow-md 
            transform transition-all 
            hover:scale-105 hover:shadow-lg
            group
          `}
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`${stat.textColor} w-8 h-8`}>
              {stat.icon}
            </div>
            <div className={`
              ${stat.textColor} 
              text-lg font-semibold
              group-hover:animate-pulse
            `}>
              {stat.label}
            </div>
          </div>
          <div className={`
            ${stat.textColor} 
            text-3xl font-bold
            group-hover:tracking-wider 
            transition-all
          `}>
            {stat.value}
          </div>
        </div>
      ))}
    </div>
  );
}