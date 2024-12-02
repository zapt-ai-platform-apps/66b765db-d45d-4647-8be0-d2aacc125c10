import { createSignal, onMount } from 'solid-js';
import { supabase } from '../supabaseClient';

export default function ReviewsScreen() {
  const [reviews, setReviews] = createSignal([]);
  const [newReview, setNewReview] = createSignal({ rating: 0, comment: '' });
  const [loading, setLoading] = createSignal(true);
  const [submitting, setSubmitting] = createSignal(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      // Fetch reviews from backend
      const data = await fetch('/api/getReviews').then(res => res.json());
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Submit new review to backend
      await fetch('/api/addReview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview())
      });
      setNewReview({ rating: 0, comment: '' });
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setSubmitting(false);
    }
  };

  onMount(fetchReviews);

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4 text-purple-600">Operator Reviews</h1>

      <form onSubmit={submitReview} class="space-y-4 mb-6">
        <div>
          <label class="block text-gray-700">Rating</label>
          <select
            value={newReview().rating}
            onInput={(e) => setNewReview({ ...newReview(), rating: e.target.value })}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            required
          >
            <option value="">Select a rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>
        <div>
          <label class="block text-gray-700">Comment</label>
          <textarea
            value={newReview().comment}
            onInput={(e) => setNewReview({ ...newReview(), comment: e.target.value })}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class={`w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${submitting() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={submitting()}
        >
          {submitting() ? 'Submitting...' : 'Add Review'}
        </button>
      </form>

      {loading() ? (
        <p>Loading...</p>
      ) : (
        <div class="space-y-4">
          {reviews().map(review => (
            <div class="p-4 bg-white rounded-lg shadow-md">
              <p class="font-semibold text-purple-600">Rating: {review.rating} Stars</p>
              <p>{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}