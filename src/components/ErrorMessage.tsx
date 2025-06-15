import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="text-center py-16">
      <div className="flex justify-center mb-4">
        <AlertCircle className="h-16 w-16 text-red-400" />
      </div>
      <h3 className="text-2xl font-semibold text-white mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors duration-300"
        >
          <RefreshCw className="h-5 w-5" />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;