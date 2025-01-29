// pages/auth/signin.js
'use client';

import Spinner from "@/components/Spinner";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function signin() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: form.email,
        password: form.password,
      });

      if (!result.error) {
        // Successful login
        router.push('/');
      } else {
        // Error from server
        setError('Invalid email or password');
        setTimeout(() => {
          setError('');
        }, 4000);
      }
    } catch (err) {
      // Catch any unexpected errors
      console.error('sign-in error:', err);
      setError('SignIn Failed. Try again!');
      setTimeout(() => {
        setError('');
      }, 4000);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex flex-center wh_100">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-center full-h">
      <div className="loginform">
        <div className="heading">Sign In</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            onChange={handleChange}
            value={form.email}
            className="input"
            placeholder="Enter email address"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            value={form.password}
            className="input"
            placeholder="Enter Password"
          />
          <button className="login-button" type="submit" disabled={loading}>
            {loading ? 'Logging In...' : 'LogIn'}
          </button>
          {error && <p className="redcolor">{error}</p>}
        </form>
        <p className="agreement">
          Don't have an account?
          <span onClick={() => router.push('/auth/signup')} className="link-text">
            SignUp here
          </span>
        </p>

      </div>
    </div>
  );
}
