import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';

export default function EmergencyScreen() {
  const [formData, setFormData] = createSignal({ description: '', location: '' });
  const [submitting, setSubmitting] = createSignal(false);

  const submitEmergency = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Submit emergency report to backend
      await fetch('/api/reportEmergency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData())
      });
      alert('Emergency reported successfully.');
    } catch (error) {
      console.error('Error reporting emergency:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const emergencyContacts = [
    { name: 'Site Manager', phone: '+123456789' },
    { name: 'Safety Officer', phone: '+987654321' },
  ];

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4 text-purple-600">Emergency Situations</h1>
      <form onSubmit={submitEmergency} class="space-y-4 mb-6">
        <div>
          <label class="block text-gray-700">Problem Description</label>
          <textarea
            value={formData().description}
            onInput={(e) => setFormData({ ...formData(), description: e.target.value })}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            required
          ></textarea>
        </div>
        <div>
          <label class="block text-gray-700">Location</label>
          <input
            type="text"
            value={formData().location}
            onInput={(e) => setFormData({ ...formData(), location: e.target.value })}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            required
          />
        </div>
        <button
          type="submit"
          class={`w-full px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${submitting() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={submitting()}
        >
          {submitting() ? 'Submitting...' : 'Report Emergency'}
        </button>
      </form>

      <h2 class="text-xl font-semibold mb-2 text-purple-600">Emergency Contacts</h2>
      <div class="space-y-2">
        {emergencyContacts.map(contact => (
          <div class="p-4 bg-white rounded-lg shadow-md">
            <p class="font-semibold">{contact.name}</p>
            <p class="text-blue-500">
              <a href={`tel:${contact.phone}`}>{contact.phone}</a>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}