import { createSignal, onMount, Show } from 'solid-js';
import { supabase } from '../supabaseClient';

export default function ProfileScreen() {
  const [profile, setProfile] = createSignal({
    fullName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [loading, setLoading] = createSignal(true);
  const [saving, setSaving] = createSignal(false);
  const [message, setMessage] = createSignal('');

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      // Fetch additional profile data if needed
      setProfile({
        fullName: user.user_metadata.full_name || '',
        email: user.email || '',
        phone: user.user_metadata.phone || '',
        address: user.user_metadata.address || ''
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const updates = {
        full_name: profile().fullName,
        phone: profile().phone,
        address: profile().address
      };
      // Update user metadata
      await supabase.auth.updateUser({
        data: updates
      });
      setMessage('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  onMount(fetchProfile);

  return (
    <div class="p-4">
      <h1 class="text-2xl font-bold mb-4 text-purple-600">User Profile</h1>
      <Show when={!loading()} fallback={<p>Loading...</p>}>
        <form onSubmit={saveProfile} class="space-y-4">
          <div>
            <label class="block text-gray-700">Full Name</label>
            <input
              type="text"
              value={profile().fullName}
              onInput={(e) => setProfile({ ...profile(), fullName: e.target.value })}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            />
          </div>
          <div>
            <label class="block text-gray-700">Email</label>
            <input
              type="email"
              value={profile().email}
              disabled
              class="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed box-border"
            />
          </div>
          <div>
            <label class="block text-gray-700">Phone Number</label>
            <input
              type="text"
              value={profile().phone}
              onInput={(e) => setProfile({ ...profile(), phone: e.target.value })}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            />
          </div>
          <div>
            <label class="block text-gray-700">Address</label>
            <input
              type="text"
              value={profile().address}
              onInput={(e) => setProfile({ ...profile(), address: e.target.value })}
              class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
            />
          </div>
          <button
            type="submit"
            class={`w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${saving() ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={saving()}
          >
            {saving() ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
        {message() && <p class="mt-4 text-green-500">{message()}</p>}
      </Show>
    </div>
  );
}