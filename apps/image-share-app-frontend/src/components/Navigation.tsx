import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../helpers/contexts/auth';
import { Button } from './Form/Button';

export function Navigation() {
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const auth = useAuth();
  const location = useLocation();

  const tokenPayload = auth.getTokenPayload();

  const toggleHide = () => {
    const targetEl = document.getElementById('navbar-default');
    targetEl.classList.toggle('hidden');
  };

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link to={auth.token ? '/dashboard' : '/'} className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Image Share App
          </span>
        </Link>
        <button
          onClick={toggleHide}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex flex-col items-center p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {!auth.token && (
              <>
                <li>
                  <Link
                    className={
                      location.pathname === '/'
                        ? 'block py-2 pl-3 pr-4 rounded md:bg-transparent text-blue-700 md:p-0 dark:text-white active font-extrabold'
                        : 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-white'
                    }
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname.includes('/login')
                        ? 'block py-2 pl-3 pr-4 rounded md:bg-transparent text-blue-700 md:p-0 dark:text-white active font-extrabold'
                        : 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-white'
                    }
                    to="/login"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname.includes('/register')
                        ? 'block py-2 pl-3 pr-4 rounded md:bg-transparent text-blue-700 md:p-0 dark:text-white active font-extrabold'
                        : 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-white'
                    }
                    to="/register"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            {auth.token && (
              <>
                {tokenPayload.role === 'admin' && (
                  <li>
                    <button
                      type="button"
                      id="dropdownNavbarLink"
                      onClick={() => setIsNavDropdownOpen(!isNavDropdownOpen)}
                      className="flex items-center justify-between w-full py-2 pl-3 pr-4 font-medium text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-gray-400 dark:hover:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                    >
                      Admin
                      <svg
                        className="w-5 h-5 ml-1"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <div
                      id="dropdownNavbar"
                      className={`absolute z-10 ${
                        isNavDropdownOpen ? '' : 'hidden'
                      } font-normal bg-white divide-y divide-gray-100 rounded shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                    >
                      <ul
                        className="py-1 text-sm text-gray-700 dark:text-gray-400"
                        aria-labelledby="dropdownLargeButton"
                      >
                        <li>
                          <Link
                            onClick={() => setIsNavDropdownOpen(false)}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            to="/dashboard"
                          >
                            Dashboard
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                )}
                <li>
                  <Link
                    className={
                      location.pathname.includes('/image-stream')
                        ? 'block py-2 pl-3 pr-4 rounded md:bg-transparent text-blue-700 md:p-0 dark:text-white active font-extrabold'
                        : 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-white'
                    }
                    to="/image-stream"
                  >
                    Image Stream
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname.includes('/profile')
                        ? 'block py-2 pl-3 pr-4 rounded md:bg-transparent text-blue-700 md:p-0 dark:text-white active font-extrabold'
                        : 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-white'
                    }
                    to="/profile"
                  >
                    Profil
                  </Link>
                </li>
                <li>
                  <Link
                    className={
                      location.pathname.includes('/upload-images')
                        ? 'block py-2 pl-3 pr-4 rounded md:bg-transparent text-blue-700 md:p-0 dark:text-white active font-extrabold'
                        : 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-white'
                    }
                    to="/upload-images"
                  >
                    Upload Image
                  </Link>
                </li>
                <li>
                  <Button
                    type="button"
                    color="yellow"
                    onClick={async () => {
                      await auth.handleLogout();
                    }}
                  >
                    Logout
                  </Button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
