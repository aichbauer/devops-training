import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { UnprotectedRoute } from './components/UnprotectedRoute';
import { ROLES } from './helpers/roles';
import { Dashboard } from './views/Dashboard';
import { Error404 } from './views/Error404';
import { Home } from './views/Home';
import { ImageStream } from './views/ImageStream';
import { Login } from './views/Login';
import { Profile } from './views/Profile';
import { Register } from './views/Register';
import { UploadImage } from './views/UploadImage';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <UnprotectedRoute>
            <Home />
          </UnprotectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <UnprotectedRoute>
            <Login />
          </UnprotectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <UnprotectedRoute>
            <Register />
          </UnprotectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute type={ROLES.admin}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/upload-images"
        element={
          <ProtectedRoute>
            <UploadImage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/image-stream"
        element={
          <ProtectedRoute>
            <ImageStream />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<Error404 />} />
    </>,
  ),
);
