import React, { useState } from 'react';
import { PaymentDetails } from '../types';
import { X, Copy } from 'lucide-react';

interface PaymentModalProps {
  paymentDetails: PaymentDetails;
  onClose: () => void;
  onProceed: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ paymentDetails, onClose, onProceed }) => {
  const { meal, isSubscription, amount, customerDetails } = paymentDetails;
  const [copied, setCopied] = useState(false);
  const upiId = 'srihariharishastar-1@oksbi';
  
  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubscribe = () => {
    const message = `I WANT TO SUBSCRIBE TO YOUR MEAL\n\n` +
      `Selected Plan: ${meal.name}\n` +
      `Monthly Price: ₹${meal.monthlyPrice}\n\n` +
      `Customer Details:\n` +
      `Name: ${customerDetails.name}\n` +
      `Phone: ${customerDetails.phone}\n` +
      `Address: ${customerDetails.address}`;
    window.open(`https://wa.me/917676578507?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  if (isSubscription) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          
          <h3 className="text-xl font-bold text-center mb-4">Subscribe to Monthly Plan</h3>
          <p className="text-center text-gray-600 mb-6">
            You'll be redirected to WhatsApp to complete your subscription.
          </p>
          
          <button
            onClick={handleSubscribe}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md transition-colors"
          >
            Continue to WhatsApp
          </button>
        </div>
      </div>
    );
  }

  // Get QR code based on meal type and price
  let qrCodeUrl = '';
  if (meal.id === 'veg-plan') {
    qrCodeUrl = 'https://media-hosting.imagekit.io/df07147be49f4e48/189.jpg?Expires=1840778353&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=oiLUGWYFMtFMNvWmWaor1V0odBey9yRCVSv0b5e-9hfbp81awbj7R3TJ4tXYnrcjQuutOSDfkKg031aPhr5vCwabnV90zHW7AK8Uu8zp-fARrsWmWHyt5ahCykCyX0CQPtczLMExx~bKa4nroBKqw0sMUgQN1oSZcqCVR9OvhNh9y8u2WLZ0RGMhpqc4MtjXE32EP-d0n4nVBoQps2m9mKq~UwDq8n4Yo3LxmvlU1R93yYmMAI9tpPDN4LbQ8Q6WIUxQseOHCR8sR8XBhgGfy3ztxggr2~6FvKRhEiH7rPhamXSRxMyBQHC82xCN90Kkj9rliGMzR2PAfg-xCEGYMQ__';
  } else if (meal.id === 'non-veg-plan') {
    qrCodeUrl = 'https://media-hosting.imagekit.io/ef3475a299824930/219.jpg?Expires=1840778449&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=xsXpNNYIAL5BOSbscsn7Jm8xzd~yZ86ngRlpPiFB4Adw2ATkNo41dl8ezGBhUWUCfaVBMzZ0iSWrYDIizokd8VHkxe7kXPmYSP4DDOZfd9PqmPFi8rdg~ZjGXjEhB--F9mKvI5WAf2WMnjv5HJtP0Ot8dF~xCi3dNn2EBHAqbeIm1m06-jX5yc0or15NRsZBRJHLKarpeh9X4b7-XpIkreoeODaBydbyR82gy-burnSY1uRBmd~wjVYmvpJ7sDRt2C423BLuRDx53GfiVq8nL17lwbu8exbRHW-P057XTq0w2dgGbhITsIVW-roJ7SNGVcZqAhv1FQ4EQdI3DJvJmQ__';
  } else {
    qrCodeUrl = 'https://media-hosting.imagekit.io/8dfb632010c648cf/60d80f52-6d7b-47a6-b307-f1c7aa1add2d.jpg?Expires=1840778201&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=Y31~aescmGKBC7HqK6a0cBYgUkNfaO6ApG6ZapS5B3I8Lrh3yMaBdO1Q8EC-3BidieKLOv6GbqeuvSwK57Z2fM5UL063rZQ7bR6DmDUJ0lPvD2In0Ro1kj08RtGmsEDp3gc9qdY~nHhw5vDoeCT0GbIW2~70EdD1m1llyHqvFV~IX9ix~08KeKGGa1Qwy2bwNSOwMIp9h43TCwIqRgmtGJ8w8PCSoJ6W98Qem5k1EjpVAHBBuiHA2C47tSwfqITfgrB09MaKQ8ufe~Mgk9jkCc9LhEMB1jxYYhOGf7R~YUEboKLwJlZUlueLQUKSbb6buNd5qoRwL1smHvydT9meqA__';
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-xl font-bold text-center mb-4">
          Complete Your Payment
        </h3>
        
        <div className="text-center mb-4">
          <p className="font-semibold text-gray-800">{meal.name}</p>
          <p className="text-2xl font-bold text-orange-600 my-2">₹{amount}</p>
        </div>
        
        <div className="flex justify-center mb-6">
          <img 
            src={qrCodeUrl} 
            alt="Payment QR Code" 
            className="border p-2 rounded-lg"
          />
        </div>
        
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg mb-6">
          <span className="text-sm font-medium">UPI ID: {upiId}</span>
          <button
            onClick={handleCopyUPI}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
          >
            <Copy size={18} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        
        <button
          onClick={onProceed}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-md transition-colors mb-4"
        >
          Confirm Payment
        </button>

        <div className="text-xs text-gray-500">
          <p className="font-semibold mb-1">Terms & Conditions:</p>
          <ul className="list-disc pl-4">
            <li>No refunds after 5 minutes of order placement</li>
            <li>Subscription cannot be canceled mid-month</li>
            <li>No refunds will be provided for subscription cancellations</li>
            <li>If an item is not available, a complementary item will be provided</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;