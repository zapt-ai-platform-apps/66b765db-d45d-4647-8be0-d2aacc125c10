import { createSignal, onMount } from 'solid-js';
import { supabase } from '../supabaseClient';
import { useNavigate } from '@solidjs/router';

export default function HomeScreen() {
  const [sites, setSites] = createSignal([]);
  const [operators, setOperators] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      // Replace with actual API calls to fetch data
      const sitesData = await fetch('/api/getConstructionSites').then(res => res.json());
      const operatorsData = await fetch('/api/getOperators').then(res => res.json());

      setSites(sitesData);
      setOperators(operatorsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(fetchData);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <div class="p-4">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold text-purple-600">CraneApp</h1>
        <button
          class="px-6 py-2 bg-red-500 text-white rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>

      <div class="mb-4">
        <input
          type="text"
          placeholder="Search..."
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border"
        />
      </div>

      <div>
        <h2 class="text-xl font-semibold mb-2 text-purple-600">Construction Sites</h2>
        {loading() && <p>Loading...</p>}
        {!loading() && (
          <div class="space-y-2">
            {sites().map(site => (
              <div
                class="p-4 bg-white rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => navigate(`/sites/${site.id}`)}
              >
                <h3 class="text-lg font-semibold">{site.name}</h3>
                <p>{site.address}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div class="mt-6">
        <h2 class="text-xl font-semibold mb-2 text-purple-600">Operators</h2>
        {loading() && <p>Loading...</p>}
        {!loading() && (
          <div class="space-y-2">
            {operators().map(operator => (
              <div
                class="p-4 bg-white rounded-lg shadow-md cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
                onClick={() => navigate(`/operators/${operator.id}`)}
              >
                <h3 class="text-lg font-semibold">{operator.name}</h3>
                <p>Rating: {operator.rating}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}