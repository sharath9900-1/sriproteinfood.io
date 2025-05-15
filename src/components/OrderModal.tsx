import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { MealPlan, CustomerDetails } from '../types';
import { useAuth } from '../context/AuthContext';

interface OrderModalProps {
  meal: MealPlan;
  onClose: () => void;
  customerDetails?: CustomerDetails;
}

const getNextOrderId = () => {
  const currentId = parseInt(localStorage.getItem('lastOrderId') || '0', 10);
  const nextId = currentId + 1;
  localStorage.setItem('lastOrderId', nextId.toString());
  return nextId.toString().padStart(4, '0');
};

const OrderModal: React.FC<OrderModalProps> = ({ meal, onClose, customerDetails }) => {
  const [orderStatus, setOrderStatus] = useState('pending');
  const orderId = getNextOrderId();
  const { addOrder } = useAuth();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderStatus('confirmed');
      
      // Add order to user's order history with full details
      if (customerDetails) {
        addOrder({
          id: orderId,
          mealId: meal.id,
          status: 'confirmed',
          date: new Date().toISOString(),
          amount: meal.price,
          customerDetails: {
            name: customerDetails.name,
            phone: customerDetails.phone,
            address: customerDetails.address,
            location: customerDetails.location
          }
        });
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (customerDetails) {
      const message = `*New Order Confirmation*\n\n` +
        `Order ID: #${orderId}\n` +
        `Meal: ${meal.name}\n` +
        `Price: ₹${meal.price}\n` +
        `Status: Confirmed\n\n` +
        `*Customer Details:*\n` +
        `Name: ${customerDetails.name}\n` +
        `Phone: ${customerDetails.phone}\n` +
        `Address: ${customerDetails.address}`;
      
      window.open(`https://wa.me/917676578507?text=${encodeURIComponent(message)}`, '_blank');
    }
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <div className="text-center mb-6">
          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 ${
            orderStatus === 'confirmed' ? 'bg-green-100' : 'bg-orange-100'
          }`}>
            <Check size={32} className={
              orderStatus === 'confirmed' ? 'text-green-600' : 'text-orange-600'
            } />
          </div>
          <h3 className={`text-xl font-bold mb-2 ${
            orderStatus === 'confirmed' ? 'text-green-600' : 'text-orange-600'
          }`}>
            {orderStatus === 'confirmed'
              ? 'Order Confirmed!'
              : 'Processing Order...'}
          </h3>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-medium mb-2">Order Details:</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Order ID:</span>
              <span className="font-medium">#{orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Meal:</span>
              <span className="font-medium">{meal.name}</span>
            </div>
            <div className="flex justify-between">
              <span>Price:</span>
              <span className="font-medium">₹{meal.price}</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={`font-medium ${
                orderStatus === 'confirmed' ? 'text-green-600' : 'text-orange-600'
              }`}>
                {orderStatus === 'confirmed' ? 'Confirmed' : 'Processing'}
              </span>
            </div>
          </div>
        </div>
        
        {customerDetails && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h4 className="font-medium mb-2">Delivery Details:</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Name:</span>
                <span className="font-medium">{customerDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Phone:</span>
                <span className="font-medium">{customerDetails.phone}</span>
              </div>
              <div>
                <span className="block font-medium mb-1">Address:</span>
                <span className="block text-gray-600">{customerDetails.address}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center">
          <button
            onClick={handleClose}
            className={`${
              orderStatus === 'confirmed'
                ? 'bg-green-600 hover:bg-green-700'
                : 'bg-orange-600 hover:bg-orange-700'
            } text-white py-2 px-8 rounded-md transition-colors`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;