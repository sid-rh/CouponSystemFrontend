import React, { useState, useEffect } from 'react';
import { getCoupons, addCoupon, updateCoupon } from '../services/api';

function AdminDashboard() {
  const [coupons, setCoupons] = useState([]);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = async () => {
    try {
      const data = await getCoupons();
      setCoupons(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      await addCoupon(newCouponCode);
      setNewCouponCode('');
      loadCoupons();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleToggleActive = async (id, isActive) => {
    try {
      await updateCoupon(id, { isActive: !isActive });
      loadCoupons();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Coupon</h2>
        <form onSubmit={handleAddCoupon} className="flex gap-4">
          <input
            type="text"
            value={newCouponCode}
            onChange={(e) => setNewCouponCode(e.target.value)}
            placeholder="Enter coupon code"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Coupon
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Claimed By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Claimed At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {coupons.map((coupon) => (
              <tr key={coupon._id}>
                <td className="px-6 py-4 whitespace-nowrap">{coupon.code}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    coupon.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {coupon.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.claimedBy?.ip || '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {coupon.claimedBy?.claimedAt
                    ? new Date(coupon.claimedBy.claimedAt).toLocaleString()
                    : '-'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleToggleActive(coupon._id, coupon.isActive)}
                    className={`px-4 py-2 rounded-md text-white ${
                      coupon.isActive
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {coupon.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;