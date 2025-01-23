import React from 'react';

export default function BarChart({ data = [] }) {
  // Handle empty or undefined data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 text-center text-gray-500">
        No data available
      </div>
    );
  }

  // Calculate max applications and define chart dimensions
  const maxApplications = Math.max(...data.map((d) => d.applications));
  const chartWidth = 600;
  const chartHeight = 300;
  const barWidth = 50;
  const gap = 20;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Job Applications</h3>
      <svg 
        viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
        className="w-full"
        aria-label="Bar chart showing job applications"
      >
        {/* Vertical grid lines */}
        {data.map((_, i) => (
          <line
            key={`grid-${i}`}
            x1={(i * (barWidth + gap)) + barWidth / 2}
            y1={0}
            x2={(i * (barWidth + gap)) + barWidth / 2}
            y2={chartHeight - 50}
            className="stroke-gray-200 stroke-1"
          />
        ))}

        {/* Bars with gradient and hover effect */}
        {data.map((d, i) => {
          const barHeight = (d.applications / maxApplications) * (chartHeight - 100);
          return (
            <g key={i} className="group">
              {/* Bar shadow */}
              <rect
                x={(i * (barWidth + gap)) + 5}
                y={chartHeight - barHeight - 40 + 5}
                width={barWidth}
                height={barHeight}
                className="fill-gray-200 opacity-50"
              />

              {/* Main bar with gradient */}
              <rect
                x={i * (barWidth + gap)}
                y={chartHeight - barHeight - 40}
                width={barWidth}
                height={barHeight}
                className="fill-blue-500 transition-all duration-300 
                           group-hover:fill-blue-600 
                           group-hover:scale-105"
                rx="4" // Rounded corners
              />

              {/* Job title */}
              <text
                x={(i * (barWidth + gap)) + barWidth / 2}
                y={chartHeight - 10}
                textAnchor="middle"
                className="text-xs text-gray-600 
                           group-hover:text-gray-800 
                           transition-colors"
              >
                {d.job ? d.job.split(" ")[0] : 'Job'}
              </text>

              {/* Application count */}
              <text
                x={(i * (barWidth + gap)) + barWidth / 2}
                y={chartHeight - barHeight - 50}
                textAnchor="middle"
                className="text-sm font-bold text-gray-800 
                           opacity-0 group-hover:opacity-100 
                           transition-opacity"
              >
                {d.applications || 0}
              </text>
            </g>
          );
        })}

        {/* X-axis line */}
        <line
          x1={0}
          y1={chartHeight - 40}
          x2={chartWidth}
          y2={chartHeight - 40}
          className="stroke-gray-300 stroke-2"
        />
      </svg>
    </div>
  );
}