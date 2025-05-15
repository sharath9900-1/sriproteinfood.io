import React from 'react';
import { X, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AccountModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { user, logout } = useAuth();

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMealName = (mealId: string) => {
    switch (mealId) {
      case 'veg-plan':
        return 'Veg Meal';
      case 'non-veg-plan':
        return 'Non-Veg Meal';
      case 'paneer-sprouts':
        return 'Paneer Sprouts';
      case 'soybean-sprouts':
        return 'Soybean Sprouts';
      default:
        return 'Mixed Sprouts';
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      onClose();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-bold mx-auto mb-4">
            {getInitials(user?.email || '')}
          </div>
          <h3 className="text-xl font-bold">{user?.email}</h3>
          <button
            onClick={handleLogout}
            className="mt-4 flex items-center gap-2 text-red-600 hover:text-red-700 mx-auto"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>

        <div className="border-t pt-6">
          <h4 className="font-semibold mb-4">Your Orders</h4>
          {user?.orders && user.orders.length > 0 ? (
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div key={order.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="font-medium text-gray-900">Order #{order.id}</span>
                      <p className="text-sm text-gray-600">{formatDate(order.date)}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                      order.status === 'confirmed' ? 'bg-orange-100 text-orange-800' : 
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>

                  <div className="border-t border-gray-200 pt-3 mb-3">
                    <h5 className="font-medium mb-2">Order Details</h5>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-gray-600">Meal:</span> {getMealName(order.mealId)}</p>
                      <p><span className="text-gray-600">Amount:</span> ₹{order.amount}</p>
                    </div>
                  </div>

                  {order.customerDetails && (
                    <div className="border-t border-gray-200 pt-3">
                      <h5 className="font-medium mb-2">Delivery Details</h5>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-600">Name:</span> {order.customerDetails.name}</p>
                        <p><span className="text-gray-600">Phone:</span> {order.customerDetails.phone}</p>
                        <p><span className="text-gray-600">Address:</span> {order.customerDetails.address}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center">No orders yet</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountModal;