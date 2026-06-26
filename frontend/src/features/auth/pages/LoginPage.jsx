import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { loginSchema } from '../validation/auth.schema';
import useAuth from '../../../hooks/useAuth';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [apiError, setApiError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if redirected due to expired token
  const wasSessionExpired = searchParams.get('expired') === 'true';

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      await login(data.email, data.password);
      navigate('/dashboard');
    } catch (err) {
      setApiError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getErrorContent = (message) => {
    const normalizedMessage = (message || '').toLowerCase();

    if (normalizedMessage.includes('sign up first') || normalizedMessage.includes('no user found')) {
      return {
        title: 'No account found',
        body: 'We could not find an account with that email. Please sign up first or verify the email you entered.',
        accentClass: 'bg-sky-500/10 border-sky-500/20 text-sky-300',
        iconClass: 'bg-sky-500/20 text-sky-400',
        actionText: 'Create Account'
      };
    }

    if (normalizedMessage.includes('wrong password')) {
      return {
        title: 'Wrong password',
        body: 'That password does not match the account for this email. Please try again or reset your password.',
        accentClass: 'bg-amber-500/10 border-amber-500/20 text-amber-300',
        iconClass: 'bg-amber-500/20 text-amber-400',
        actionText: 'Try Again'
      };
    }

    return {
      title: 'Authentication failed',
      body: message || 'Please check your credentials and try again.',
      accentClass: 'bg-rose-500/10 border-rose-500/20 text-rose-300',
      iconClass: 'bg-rose-500/20 text-rose-400',
      actionText: 'Try Again'
    };
  };

  const errorContent = getErrorContent(apiError);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 w-full">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 items-center justify-center shadow-lg shadow-sky-500/20 mb-4">
            <span className="text-white font-bold text-2xl">X</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Welcome Back</h2>
          <p className="text-slate-400 mt-2 text-sm">Sign in to your TalentBoardX account</p>
        </div>

        {wasSessionExpired && (
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-lg text-xs mb-6 text-center">
            Your session has expired. Please sign in again.
          </div>
        )}

        {apiError && (
          <div className={`p-5 border rounded-xl mb-6 relative overflow-hidden transition-all duration-300 ${errorContent.accentClass}`}>
            <div className="flex items-start space-x-3 text-left">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold shrink-0 ${errorContent.iconClass}`}>
                ⚠
              </div>
              <div>
                <h4 className="text-sm font-bold">{errorContent.title}</h4>
                <p className="text-xs opacity-90 mt-1 leading-relaxed">
                  {errorContent.body}
                </p>
                <div className="flex items-center space-x-3 mt-3">
                  <button 
                    type="button" 
                    onClick={() => setApiError(null)} 
                    className="text-[10px] font-bold text-white bg-slate-800 hover:bg-slate-700 px-3 py-1 rounded transition-colors"
                  >
                    {errorContent.actionText}
                  </button>
                  {(errorContent.title === 'No account found' || errorContent.title === 'Authentication failed') && (
                    <Link 
                      to="/register" 
                      className="text-[10px] font-bold text-sky-400 hover:text-sky-300 transition-colors"
                    >
                      Create Account
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register('email')}
              className={`w-full px-4 py-3 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.email ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
            {errors.email && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.email.message}</span>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register('password')}
              className={`w-full px-4 py-3 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.password ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
            {errors.password && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.password.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-sky-500/10 flex items-center justify-center disabled:opacity-50"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-sm text-slate-500">
          Don't have an account?{' '}
          <Link to="/register" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
