import React, { useState, useEffect } from 'react';
import { MessageCircle, Star, X } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface Review {
  id: string;
  user_id: string;
  meal_id: string;
  rating: number;
  comment: string;
  created_at: string;
  reviewer_name: string;
}

const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [newReview, setNewReview] = useState({
    mealId: '',
    rating: 5,
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('Unable to load reviews. Please try again later.');
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowNamePrompt(false);
    setShowReviewForm(true);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Get current user if authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from('reviews')
        .insert({
          meal_id: newReview.mealId,
          rating: newReview.rating,
          comment: newReview.comment,
          reviewer_name: reviewerName,
          user_id: user?.id || null // Set user_id to null for anonymous reviews
        });

      if (error) throw error;

      // Reset forms
      setNewReview({
        mealId: '',
        rating: 5,
        comment: ''
      });
      setReviewerName('');
      setShowReviewForm(false);
      
      // Fetch updated reviews
      await fetchReviews();
    } catch (err: any) {
      setError(err.message || 'Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

  const getAverageRating = () => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className={i < Math.round(Number(getAverageRating()))
                    ? 'fill-orange-500 text-orange-500'
                    : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-2xl font-bold text-orange-600">{getAverageRating()}</span>
            <span className="text-gray-600">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          {!showReviewForm && !showNamePrompt ? (
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <h3 className="text-xl font-semibold mb-2">Share Your Experience</h3>
              <p className="text-gray-600 mb-4">
                Tell us about your meal experience and help others make informed decisions.
              </p>
              <button
                onClick={() => setShowNamePrompt(true)}
                className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-md transition-colors"
              >
                <MessageCircle size={20} />
                Write a Review
              </button>
            </div>
          ) : showNamePrompt ? (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">What's your name?</h3>
                <button
                  onClick={() => {
                    setShowNamePrompt(false);
                    setError('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleNameSubmit}>
                <div className="mb-4">
                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Continue
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Write Your Review</h3>
                <button
                  onClick={() => {
                    setShowReviewForm(false);
                    setError('');
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={20} />
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmitReview}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Meal
                  </label>
                  <select
                    value={newReview.mealId}
                    onChange={(e) => setNewReview({ ...newReview, mealId: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select a meal</option>
                    <option value="veg-plan">Veg Meal</option>
                    <option value="non-veg-plan">Non-Veg Meal</option>
                    <option value="paneer-sprouts">Paneer Sprouts</option>
                    <option value="soybean-sprouts">Soybean Sprouts</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none"
                      >
                        <Star
                          size={24}
                          className={star <= newReview.rating
                            ? 'fill-orange-500 text-orange-500'
                            : 'text-gray-300'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    rows={4}
                    placeholder="Tell us about your experience..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded-md transition-colors disabled:bg-orange-400"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-bold">
                  {review.reviewer_name?.charAt(0)?.toUpperCase() || 'A'}
                </div>
                <div>
                  <h3 className="font-semibold">{review.reviewer_name || 'Anonymous'}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-gray-600 font-medium">
                  {getMealName(review.meal_id)}
                </p>
                <div className="flex gap-1 mt-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-orange-500 text-orange-500"
                    />
                  ))}
                </div>
              </div>

              <p className="text-gray-700 italic">"{review.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;