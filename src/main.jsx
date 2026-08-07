
import { createRoot } from 'react-dom/client'
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'
import { HelmetProvider } from 'react-helmet-async'

//CACHE INSTANCE
const queryClient = new QueryClient();


createRoot(document.getElementById('root')).render(
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
  </HelmetProvider>,
)
