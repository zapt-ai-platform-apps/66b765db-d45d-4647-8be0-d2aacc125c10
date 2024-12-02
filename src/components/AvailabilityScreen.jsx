import { createSignal, onMount } from 'solid-js';
import { supabase } from '../supabaseClient';

export default function AvailabilityScreen() {
  const [availableOperators, setAvailableOperators] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [submitting, setSubmitting] = createSignal(false);

  const fetchAvailableOperators = async () => {
    setLoading(true);
    try {
      const data = await fetch('/api/getAvailableOperators').then(res => res.json());
      setAvailableOperators(data);
    } catch (error) {
      console.error('Error fetching available operators:', error);
    } finally {
      setLoading(false);
    }
  };

  const reportAvailability = async () => {
    setSubmitting(true);
    try {
      // Report operator availability to backend
      await fetch('/api/reportAvailability', { method: 'POST' });
      alert('Your availability has been reported.');
      fetchAvailableOperators();
    } catch (error) {
      console.error('Error reporting availability:', error);
    } finally {
      setSubmitting(false);
    }
  };

  onMount(fetchAvailableOperators);

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4 text-purple-600">Operator Availability</h1>
      <button
        onClick={reportAvailability}
        class={`w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer mb-6 ${submitting() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={submitting()}
      >
        {submitting() ? 'Reporting...' : 'Report Availability'}
      </button>
      <h2 class="text-xl font-semibold mb-2 text-purple-600">Available Operators Nearby</h2>
      {loading() ? (
        <p>Loading...</p>
      ) : (
        <div class="space-y-2">
          {availableOperators().map(operator => (
            <div class="p-4 bg-white rounded-lg shadow-md">
              <h3 class="text-lg font-semibold">{operator.name}</h3>
              <p>{operator.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}