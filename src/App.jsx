import { createSignal, onMount, createEffect } from 'solid-js';
import { useNavigate, Routes, Route } from '@solidjs/router';
import { supabase } from './supabaseClient';

import LoginScreen from './components/LoginScreen';
import RegistrationScreen from './components/RegistrationScreen';
import HomeScreen from './components/HomeScreen';
import ProfileScreen from './components/ProfileScreen';
import ReviewsScreen from './components/ReviewsScreen';
import AvailabilityScreen from './components/AvailabilityScreen';
import EmergencyScreen from './components/EmergencyScreen';

export default function App() {
  const [user, setUser] = createSignal(null);
  const navigate = useNavigate();

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
    } else {
      navigate('/login');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((_, session) => {
      if (session?.user) {
        setUser(session.user);
        navigate('/');
      } else {
        setUser(null);
        navigate('/login');
      }
    });

    return () => {
      authListener.unsubscribe();
    };
  });

  return (
    <div class="min-h-screen">
      <Routes>
        <Route path="/" component={HomeScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/register" component={RegistrationScreen} />
        <Route path="/profile" component={ProfileScreen} />
        <Route path="/reviews" component={ReviewsScreen} />
        <Route path="/availability" component={AvailabilityScreen} />
        <Route path="/emergency" component={EmergencyScreen} />
      </Routes>
      <footer class="text-center p-4">
        Made on <a href="https://www.zapt.ai" target="_blank" class="text-blue-500 underline">ZAPT</a>
      </footer>
    </div>
  );
}