import { createContext, useContext, useState } from 'react';
import { Credentials, login } from '../../api/auth/login';
import { logout } from '../../api/auth/logout';
import { CreateUser, register, User } from '../../api/auth/register';
import { checkJSON } from '../checkJSON';

export interface RawTokenPayload {
  aud: string;
  auth_time: number;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  lng: string;
  nonce: string;
  rle: 'admin' | 'user';
  sub: string;
}

export interface PrettfiedTokenPayload {
  audience: string;
  authorization_time: number;
  expiration_time: number;
  issued_at: number;
  issuer: string;
  jwt_id: string;
  language: string;
  nonce: string;
  role: 'admin' | 'user';
  subject: string;
}

export interface Auth {
  token: string | null;
  user: User;
  loading: boolean;
  handleLogin: (credentials: Credentials) => any;
  handleRegister: (user: CreateUser) => any;
  handleLogout: () => undefined;
  getTokenPayload: () => PrettfiedTokenPayload;
  setLoading: (loading: boolean) => undefined;
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [user, setUser] = useState(
    checkJSON(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null,
  );
  const [loading, setLoading] = useState(true);

  const handleLogin = async (credentials: Credentials) => {
    const response = await login(credentials);

    localStorage.setItem('accessToken', response?.data?.data?.[0].token);
    setToken(localStorage.getItem('accessToken'));
    localStorage.setItem('user', JSON.stringify(response?.data?.data?.[0].user));
    setUser(JSON.parse(localStorage.getItem('user')));
    setLoading(false);
  };

  const handleRegister = async (registerUserData: CreateUser) => {
    const response = await register(registerUserData);
    localStorage.setItem('accessToken', response?.data?.data?.[0].token);
    setToken(localStorage.getItem('accessToken'));
    localStorage.setItem('user', JSON.stringify(response?.data?.data?.[0].user));
    setUser(JSON.parse(localStorage.getItem('user')));
    setLoading(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    }

    localStorage.clear();

    window.location.href = `${process.env.BASE_APP_URL}/`;
  };

  const getTokenPayload = () => {
    if (!token || token === 'undefined') {
      return {
        audience: null,
        authorization_time: null,
        expiration_time: null,
        issued_at: null,
        issuer: null,
        jwt_id: null,
        language: null,
        nonce: null,
        role: null,
        subject: null,
      };
    }

    const base64Url = token?.split('.')?.[1];
    const base64 = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        ?.atob(base64)
        ?.split('')
        ?.map((c) => {
          return `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`;
        })
        ?.join(''),
    );
    const rawTokenPayload: RawTokenPayload = JSON.parse(jsonPayload);
    const prettifiedTokenPayload: PrettfiedTokenPayload = {
      audience: rawTokenPayload?.aud,
      authorization_time: rawTokenPayload?.auth_time,
      expiration_time: rawTokenPayload?.exp,
      issued_at: rawTokenPayload?.iat,
      issuer: rawTokenPayload?.iss,
      jwt_id: rawTokenPayload?.jti,
      language: rawTokenPayload?.lng,
      nonce: rawTokenPayload?.nonce,
      role: rawTokenPayload?.rle,
      subject: rawTokenPayload?.sub,
    };

    return prettifiedTokenPayload;
  };

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        token,
        user,
        loading,
        handleLogin,
        handleLogout,
        handleRegister,
        getTokenPayload,
        setLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext<Auth>(AuthContext);
}
