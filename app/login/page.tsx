'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '../hooks/useAuth';
import API from '../api';
import Link from 'next/link';

interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  refreshToken: string;
}

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const user = useAuth();

  if (user) {
    return (
        <div className='container flex flex-row justify-between p-24'>
            <Link href="/profile">
                <button className="btn btn-primary">
                    GO Profile
                </button>
            </Link>
            <Link href="/logout">
                <button className="btn btn-primary">
                    GO Logout
                </button>
            </Link>
        </div>
        
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await API.post<LoginResponse>('/user/me', { username, password });
      const userData = res.data;

      localStorage.setItem('token', userData.token);
      localStorage.setItem('refreshToken', userData.refreshToken);

      router.push('/profile');
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
}
