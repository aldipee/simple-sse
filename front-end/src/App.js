import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RouterProvider } from 'react-router-dom';
import { AppRoutesElements } from './routes';

function App() {
  const queryClient = new QueryClient();
  const darkTheme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <ThemeProvider theme={darkTheme}>
        <RouterProvider router={AppRoutesElements} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
