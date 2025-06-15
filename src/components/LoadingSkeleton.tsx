import React from 'react';

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse bg-gray-800/50 rounded-2xl overflow-hidden border border-gray-700/50">
      <div className="h-80 bg-gray-700/50" />
      <div className="p-5">
        <div className="h-6 bg-gray-700/50 rounded mb-3" />
        <div className="h-4 bg-gray-700/50 rounded mb-3 w-3/4" />
        <div className="flex gap-4 mb-4">
          <div className="h-4 bg-gray-700/50 rounded w-16" />
          <div className="h-4 bg-gray-700/50 rounded w-20" />
          <div className="h-4 bg-gray-700/50 rounded w-16" />
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-gray-700/50 rounded" />
          <div className="h-4 bg-gray-700/50 rounded" />
          <div className="h-4 bg-gray-700/50 rounded w-3/4" />
        </div>
        <div className="flex gap-2 mb-3">
          <div className="h-6 bg-gray-700/50 rounded-lg w-16" />
          <div className="h-6 bg-gray-700/50 rounded-lg w-20" />
          <div className="h-6 bg-gray-700/50 rounded-lg w-18" />
        </div>
        <div className="pt-3 border-t border-gray-800">
          <div className="h-3 bg-gray-700/50 rounded w-2/3" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;