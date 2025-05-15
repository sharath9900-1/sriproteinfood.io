import React from 'react';
import { MessageCircle } from 'lucide-react';

const Header: React.FC = () => {
  const handleChatClick = () => {
    window.open('https://wa.me/917676578507?text=Hi,%20I%20want%20to%20know%20more%20about%20your%20meals', '_blank');
  };

  return (
    <header className="relative">
      <div className="bg-gradient-to-r from-orange-600 to-orange-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <h1 className="text-white text-2xl font-bold">SRI PROTEIN FOODS</h1>
            <button
              onClick={handleChatClick}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors text-sm"
            >
              <MessageCircle size={18} />
              Chat Now
            </button>
          </div>
        </div>
      </div>

      <div className="relative">
        <img 
          src="https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"
          alt="Protein Foods"
          className="w-full h-[300px] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">Eat Healthy, Stay Fit</h2>
            <p className="text-xl md:text-2xl mb-2">99% Natural Protein Meal</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;