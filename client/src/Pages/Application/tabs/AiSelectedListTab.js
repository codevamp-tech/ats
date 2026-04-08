import React from 'react';
import ApplicationsTable from './ApplicationsTable';
import { useTheme } from '../../../context/ThemeContext';
import { ArrowLeft } from 'lucide-react';

const AiSelectedListTab = ({
    job,
    applications,
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
    currentPage,
    totalPages,
    totalApplications,
    onViewResume,
    setActiveTab
}) => {
    const { theme } = useTheme();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setActiveTab('applications')}
                        className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-200 text-gray-600'}`}
                        aria-label="Back to Applications"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        AI Top Picks
                    </h2>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-medium ${theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-50 text-green-700'}`}>
                    {totalApplications} Candidates Selected
                </div>
            </div>

            <ApplicationsTable
                job={job}
                filteredApps={applications}
                statuses={[]} // Not needed in AI view
                onStatusChange={() => { }} // Disabled in AI view
                onViewResume={onViewResume}
                page={page}
                limit={limit}
                search={search}
                setPage={setPage}
                setLimit={setLimit}
                setSearch={setSearch}
                currentPage={currentPage}
                totalApplications={totalApplications}
                totalPages={totalPages}
                isAiView={true} // ENABLE AI VIEW MODE
            />
        </div>
    );
};

export default AiSelectedListTab;
