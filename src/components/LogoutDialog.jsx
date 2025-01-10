import React from "react";

const LogoutDialog = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
        <div className="relative p-4 w-full max-w-md">
          <div className="relative p-4 text-center bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg shadow-lg border border-blue-300 sm:p-5">
            <button 
              type="button" 
              className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center transition-all duration-200" 
              onClick={onClose}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
              </svg>
            </button>

            {/* Logout Icon */}
            <svg 
              className="w-12 h-12 mb-4 mx-auto text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              ></path>
            </svg>

            <h3 className="text-lg font-semibold text-gray-800 mb-2">Confirm Logout</h3>
            <p className="mb-6 text-gray-600">Are you sure you want to log out of your account?</p>

            <div className="flex justify-center items-center space-x-4">
              <button 
                onClick={onClose} 
                type="button" 
                className="py-2 px-4 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 
                         hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400
                         focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none
                         transition-all duration-200 transform hover:scale-105"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm} 
                type="button" 
                className="py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg
                         hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
                         focus:outline-none transition-all duration-200 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutDialog;