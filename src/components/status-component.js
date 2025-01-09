import React from 'react';

const SubmissionStatus = ({ status, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full mx-4 text-center">
        <div className={`text-2xl mb-4 ${status.error ? 'text-red-500' : 'text-green-500'}`}>
          {status.error ? '❌' : '✅'}
        </div>
        <p className="text-gray-700 mb-4">{status.message}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
        >
          סגור
        </button>
      </div>
    </div>
  );
};

export default SubmissionStatus;
