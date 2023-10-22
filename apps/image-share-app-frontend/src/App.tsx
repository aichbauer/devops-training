import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './helpers/contexts/auth';
import { router } from './router';

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
