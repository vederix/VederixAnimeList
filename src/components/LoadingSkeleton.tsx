import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse bg-gray-800/50 rounded-xl overflow-hidden border border-gray-700/50">
      <div className="h-80 bg-gray-700/50" />
      <div className="p-4">
        <div className="h-6 bg-gray-700/50 rounded mb-2" />
        <div className="flex gap-4 mb-3">
          <div className="h-4 bg-gray-700/50 rounded w-16" />
          <div className="h-4 bg-gray-700/50 rounded w-20" />
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-700/50 rounded" />
          <div className="h-4 bg-gray-700/50 rounded w-3/4" />
        </div>
        <div className="mt-3 pt-3 border-t border-gray-800">
          <div className="h-3 bg-gray-700/50 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;