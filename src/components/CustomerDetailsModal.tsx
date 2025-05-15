import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { CustomerDetails, MealPlan } from '../types';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface CustomerDetailsModalProps {
  meal: MealPlan;
  isSubscription: boolean;
  onClose: () => void;
  onSubmit: (details: CustomerDetails) => void;
}

interface LocationMarkerProps {
  onLocationSelect: (lat: number, lng: number) => void;
}

const LocationMarker: React.FC<LocationMarkerProps> = ({ onLocationSelect }) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);

  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return position === null ? null : (
    <Marker position={position} />
  );
};

const CustomerDetailsModal: React.FC<CustomerDetailsModalProps> = ({ meal, isSubscription, onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      phone,
      address,
      location: location ? `${location.lat},${location.lng}` : undefined
    });
  };

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    setLocationError('');
    setShowMap(true);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setLocation(newLocation);
        setIsGettingLocation(false);

        // Get address from coordinates using reverse geocoding
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLocation.lat}&lon=${newLocation.lng}`)
          .then(response => response.json())
          .then(data => {
            if (data.display_name) {
              setAddress(data.display_name);
            }
          })
          .catch(() => {
            setAddress(`${newLocation.lat}, ${newLocation.lng}`);
          });
      },
      (error) => {
        setIsGettingLocation(false);
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Please allow location access to use this feature');
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError('Location information is unavailable');
            break;
          case error.TIMEOUT:
            setLocationError('Location request timed out');
            break;
          default:
            setLocationError('An unknown error occurred');
        }
      }
    );
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setLocation({ lat, lng });
    
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then(response => response.json())
      .then(data => {
        if (data.display_name) {
          setAddress(data.display_name);
        }
      })
      .catch(() => {
        setAddress(`${lat}, ${lng}`);
      });
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
        
        <h3 className="text-xl font-bold text-center mb-6">Enter Delivery Details</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address
            </label>
            <div className="relative">
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
              <button
                type="button"
                onClick={getCurrentLocation}
                className="absolute top-2 right-2 text-green-600 hover:text-green-700 bg-white p-1 rounded-full"
                disabled={isGettingLocation}
              >
                <MapPin size={20} />
              </button>
            </div>
            {isGettingLocation && (
              <p className="text-sm text-orange-600 mt-1">Getting your location...</p>
            )}
            {locationError && (
              <p className="text-sm text-red-600 mt-1">{locationError}</p>
            )}
            {location && !locationError && (
              <p className="text-sm text-green-600 mt-1">
                Location found! Address updated.
              </p>
            )}
            
            <button
              type="button"
              onClick={() => setShowMap(!showMap)}
              className="mt-2 text-sm text-green-600 hover:text-green-700"
            >
              {showMap ? 'Hide Map' : 'Show Map'}
            </button>

            {showMap && (
              <div className="mt-2 h-[200px] rounded-lg overflow-hidden border border-gray-300">
                <MapContainer
                  center={location || [12.9716, 77.5946]} // Default to Bangalore
                  zoom={13}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker onLocationSelect={handleLocationSelect} />
                  {location && <Marker position={[location.lat, location.lng]} />}
                </MapContainer>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition-colors"
          >
            Proceed to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerDetailsModal;