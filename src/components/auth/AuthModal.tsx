import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          // Handle specific error cases
          switch (error.message) {
            case 'Invalid login credentials':
              throw new Error('Invalid email or password. Please try again.');
            case 'Email not confirmed':
              throw new Error('Please confirm your email address before signing in.');
            default:
              throw error;
          }
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) {
          // Handle signup specific errors
          switch (error.message) {
            case 'User already registered':
              throw new Error('An account with this email already exists. Please sign in instead.');
            case 'Password should be at least 6 characters':
              throw new Error('Password must be at least 6 characters long.');
            default:
              throw error;
          }
        } else {
          // Show success message for sign up
          setError('success:Account created! You can now sign in.');
          setIsLogin(true);
          setPassword('');
          setLoading(false);
          return;
        }
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-amber-50 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-amber-900 hover:text-amber-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-detective text-amber-900 mb-6">
            {isLogin ? 'Welcome Back, Detective' : 'Join the Investigation'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-detective text-amber-800 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 
                         focus:ring-amber-500 focus:border-amber-500 bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-detective text-amber-800 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-amber-300 rounded-lg focus:ring-2 
                         focus:ring-amber-500 focus:border-amber-500 bg-white"
                required
                minLength={6}
              />
              <p className="mt-1 text-xs text-amber-700">
                {!isLogin && 'Password must be at least 6 characters long'}
              </p>
            </div>

            {error && (
              <div className={`px-4 py-2 rounded ${
                error.startsWith('success:')
                  ? 'bg-green-100 border border-green-300 text-green-800'
                  : 'bg-red-100 border border-red-300 text-red-800'
              }`}>
                {error.replace('success:', '')}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 rounded-lg font-detective text-white 
                       ${loading 
                         ? 'bg-amber-400 cursor-not-allowed' 
                         : 'bg-amber-500 hover:bg-amber-400'}`}
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setPassword('');
                }}
                className="text-amber-700 hover:text-amber-600 text-sm"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}