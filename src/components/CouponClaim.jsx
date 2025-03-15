import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { claimCoupon } from '../services/api';

function CouponClaim() {
  const [sessionId, setSessionId] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Generate or retrieve session ID
    const storedSessionId = localStorage.getItem('sessionId');
    if (!storedSessionId) {
      const newSessionId = uuidv4();
      localStorage.setItem('sessionId', newSessionId);
      setSessionId(newSessionId);
    } else {
      setSessionId(storedSessionId);
    }
  }, []);

  const handleClaim = async () => {
    try {
      setError('');
      setSuccess(false);
      const data = await claimCoupon(sessionId);
      setCoupon(data.code);
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Claim Your Coupon</h2>
          <p className="mt-2 text-sm text-gray-600">
            Click below to get your unique discount code
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {success && coupon && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded text-center">
            <p className="font-bold">Success! Your coupon code is:</p>
            <p className="text-2xl mt-2">{coupon}</p>
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={handleClaim}
            disabled={success}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              success
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
            }`}
          >
            {success ? 'Coupon Claimed' : 'Claim Coupon'}
          </button>
        </div>

        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Note: You can only claim one coupon every 24 hours</p>
        </div>
      </div>
    </div>
  );
}

export default CouponClaim;