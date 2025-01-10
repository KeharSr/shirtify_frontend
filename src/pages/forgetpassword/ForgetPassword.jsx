import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { forgotPasswordApi, verifyOtpApi } from '../../apis/Apis';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [password, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleSendOtp = (e) => {
    e.preventDefault();
    forgotPasswordApi({ phoneNumber })
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          setIsSent(true);
        }
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
      });
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const data = {
      phoneNumber: phoneNumber,
      otp: otp,
      password: password,
    };
    verifyOtpApi(data)
      .then((res) => {
        if (res.status === 200) {
          toast.success(res.data.message);
          toast.success('Redirecting to login page in 5 seconds...');
          setTimeout(() => {
            navigate('/login');
          }, 5000);
        }
      })
      .catch((err) => {
        if (err.response.status === 400 || err.response.status === 500) {
          toast.error(err.response.data.message);
        }
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="mb-8">
          <button 
            className="flex items-center text-gray-600 hover:text-gray-800"
            onClick={() => navigate('/login')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>Back</span>
          </button>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            {!isSent 
              ? "Enter your phone number to reset your password"
              : "Enter the OTP sent to your phone number"}
          </p>
        </div>

        <form className="space-y-6">
          {!isSent ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">+977</span>
                  </div>
                  <input
                    type="tel"
                    className="block w-full pl-16 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 outline-none"
                    placeholder="Enter your phone number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={handleSendOtp}
                className="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-150"
              >
                Send OTP
              </button>
            </>
          ) : (
            <>
              <div className="rounded-lg bg-blue-50 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-blue-700">
                    OTP has been sent to your phone number {phoneNumber}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    OTP
                  </label>
                  <input
                    type="number"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 outline-none"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="block w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-150 outline-none"
                    placeholder="Enter new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
              </div>

              <button
                type="submit"
                onClick={handleVerifyOtp}
                className="w-full py-3 px-4 bg-blue-500 text-white font-medium rounded-lg hover:bg-amber-600 transition-colors duration-150"
              >
                Reset Password
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;