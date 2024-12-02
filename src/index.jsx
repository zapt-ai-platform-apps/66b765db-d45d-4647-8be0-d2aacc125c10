import { render } from 'solid-js/web';
import { Router } from '@solidjs/router';
import App from './App';
import './index.css';
import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: import.meta.env.VITE_PUBLIC_SENTRY_DSN,
  environment: import.meta.env.VITE_PUBLIC_APP_ENV,
  integrations: [Sentry.browserTracingIntegration()],
  initialScope: {
    tags: {
      type: 'frontend',
      projectId: import.meta.env.VITE_PUBLIC_APP_ID,
    },
  },
});

// Umami Analytics
if (!window.location.hostname.includes('vercel.app')) {
  const script = document.createElement('script');
  script.defer = true;
  script.src = 'https://cloud.umami.is/script.js';
  script.setAttribute('data-website-id', import.meta.env.VITE_PUBLIC_UMAMI_WEBSITE_ID);
  document.head.appendChild(script);
}

// PWA Support
window.progressierAppRuntimeSettings = {
  uid: import.meta.env.VITE_PUBLIC_APP_ID,
  icon512: "https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=512&height=512",
  name: "CraneApp",
  shortName: "CraneApp"
};
let pwaScript = document.createElement('script');
pwaScript.setAttribute('src', 'https://progressier.app/z8yY3IKmfpDIw3mSncPh/script.js');
pwaScript.setAttribute('defer', 'true');
document.querySelector('head').appendChild(pwaScript);

render(() => (
  <Router>
    <App />
  </Router>
), document.getElementById('root'));