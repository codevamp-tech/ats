import React from 'react';

export default function LineChart({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-4 text-center text-gray-500">
        No data available
      </div>
    );
  }

  const maxApplications = Math.max(...data.map((d) => d.applications));
  const chartWidth = 600;
  const chartHeight = 300;

  const points = data.map(
    (d, i) => `${(i * (chartWidth / (data.length - 1)))},${chartHeight - (d.applications / maxApplications) * (chartHeight - 60)}`
  ).join(" ");

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 overflow-hidden">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Application Trend</h3>
      <svg 
        viewBox={`0 0 ${chartWidth} ${chartHeight}`}
        className="w-full"
        aria-label="Line chart showing application trend"
      >
        {/* Horizontal grid lines */}
        {[0.25, 0.5, 0.75].map((percent) => (
          <line
            key={`grid-${percent}`}
            x1={0}
            y1={chartHeight - (percent * (chartHeight - 60))}
            x2={chartWidth}
            y2={chartHeight - (percent * (chartHeight - 60))}
            className="stroke-gray-200 stroke-1"
          />
        ))}

        {/* Line with gradient */}
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3B82F6" stopOpacity="1" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <polyline
          points={points}
          className="fill-none stroke-[3px]"
          style={{
            stroke: 'url(#lineGradient)',
            strokeLinecap: 'round',
            strokeLinejoin: 'round'
          }}
        />

        {/* Fill area under line */}
        <polygon
          points={`0,${chartHeight} ${points} ${chartWidth},${chartHeight}`}
          style={{
            fill: 'url(#lineGradient)',
            opacity: 0.1
          }}
        />

        {/* Data points and labels */}
        {data.map((d, i) => {
          const x = (i * (chartWidth / (data.length - 1)));
          const y = chartHeight - (d.applications / maxApplications) * (chartHeight - 60);
          
          return (
            <g key={i} className="group">
              {/* Hover circle */}
              <circle
                cx={x}
                cy={y}
                r="6"
                className="fill-blue-500 opacity-0 
                           group-hover:opacity-100 
                           transition-all duration-300"
              />

              {/* Main data point */}
              <circle
                cx={x}
                cy={y}
                r="4"
                className="fill-blue-500 
                           group-hover:scale-125 
                           transition-transform"
              />

              {/* Date label */}
              <text
                x={x}
                y={chartHeight - 10}
                textAnchor="middle"
                className="text-xs text-gray-600 
                           group-hover:text-gray-800 
                           transition-colors"
              >
                {d.date.split("-")[2]}
              </text>

              {/* Application count (on hover) */}
              <text
                x={x}
                y={y - 15}
                textAnchor="middle"
                className="text-sm font-bold text-gray-800 
                           opacity-0 group-hover:opacity-100 
                           transition-opacity"
              >
                {d.applications}
              </text>
            </g>
          );
        })}

        {/* X and Y axis lines */}
        <line
          x1={0}
          y1={chartHeight}
          x2={chartWidth}
          y2={chartHeight}
          className="stroke-gray-300 stroke-2"
        />
        <line
          x1={0}
          y1={0}
          x2={0}
          y2={chartHeight}
          className="stroke-gray-300 stroke-2"
        />
      </svg>
    </div>
  );
}