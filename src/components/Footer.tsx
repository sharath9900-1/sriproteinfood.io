import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">About Us</h3>
            <p className="text-gray-400">
              Sri Protein Foods is dedicated to providing healthy, protein-rich meals that help you maintain a balanced diet and achieve your fitness goals.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <a href="mailto:srihariharishastar@gmail.com" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail size={18} />
                srihariharishastar@gmail.com
              </a>
              <a href="tel:+917676578507" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Phone size={18} />
                +91 7676578507
              </a>
              <div className="flex items-start gap-2 text-gray-400">
                <MapPin size={18} className="flex-shrink-0 mt-1" />
                <p>Mysore, Karnataka, India</p>
              </div>
              <div className="flex items-start gap-2 text-gray-400">
                <Clock size={18} className="flex-shrink-0 mt-1" />
                <p>Open: Monday - Sunday<br />8:00 AM - 3:30 PM</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Terms & Conditions</h3>
            <ul className="text-gray-400 space-y-2">
              <li>• No refunds after 5 minutes of order placement</li>
              <li>• Subscription cannot be canceled mid-month</li>
              <li>• No refunds will be provided for subscription cancellations</li>
              <li>• If the order is of mixed sprouts and item not available, the amount will be refunded in 2 working days with transaction charges applicable</li>
              <li>• Optional items will be charged based on customer interest which will be asked by seller at the time of order</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#meals" className="text-gray-400 hover:text-white transition-colors">Our Meals</a>
              </li>
              <li>
                <a 
                  href="https://wa.me/917676578507?text=Hi,%20I%20want%20to%20know%20more%20about%20your%20meals"
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Chat with Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sri Protein Foods. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;