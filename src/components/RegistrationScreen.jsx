import { createSignal } from 'solid-js';
import { supabase } from '../supabaseClient';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from '@solidjs/router';

export default function RegistrationScreen() {
  const navigate = useNavigate();

  return (
    <div class="flex items-center justify-center h-full p-4">
      <div class="w-full max-w-md p-6 bg-white rounded-xl shadow-lg">
        <h2 class="text-3xl font-bold mb-4 text-center text-purple-600">Sign up with ZAPT</h2>
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline mb-6 block text-center"
        >
          Learn more about ZAPT
        </a>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          view="sign_up"
          showLinks={false}
        />
        <div class="text-center mt-4">
          <span>Already have an account? </span>
          <a href="/login" class="text-blue-500 hover:underline">Log in</a>
        </div>
      </div>
    </div>
  );
}