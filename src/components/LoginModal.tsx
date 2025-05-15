import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await login(email, password);
      onLoginSuccess();
    } catch (error: any) {
      console.error('Login error:', error);
      setError('Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      setSuccessMessage('Password reset instructions have been sent to your email.');
      setTimeout(() => {
        setShowForgotPassword(false);
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setError('Failed to send reset instructions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <dialog
      id="loginModal"
      className="modal bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-xl font-bold text-center mb-6">
          {showForgotPassword ? 'Reset Password' : 'Login to Your Account'}
        </h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition-colors disabled:bg-orange-400 mb-4"
            >
              {isLoading ? 'Sending...' : 'Send Reset Instructions'}
            </button>

            <button
              type="button"
              onClick={() => {
                setShowForgotPassword(false);
                setError('');
                setSuccessMessage('');
              }}
              className="text-sm text-orange-600 hover:text-orange-700"
            >
              Back to Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition-colors disabled:bg-orange-400 mb-4"
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  setShowForgotPassword(true);
                  setError('');
                }}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Forgot Password?
              </button>

              <button
                type="button"
                onClick={() => window.location.href = '/signup'}
                className="text-sm text-orange-600 hover:text-orange-700"
              >
                Create Account
              </button>
            </div>
          </form>
        )}
      </div>
    </dialog>
  );
};

export default LoginModal;