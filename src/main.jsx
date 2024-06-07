import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'semantic-ui-css/semantic.min.css';
import AuthContextProvider from './components/context.jsx';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthContextProvider>  
        <App />
      </ AuthContextProvider>  
    </QueryClientProvider>
  </React.StrictMode>,
)
