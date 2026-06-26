import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { registerSchema } from '../validation/auth.schema';
import useAuth from '../../../hooks/useAuth';

export const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [apiError, setApiError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'job_seeker'
    }
  });

  const selectedRole = watch('role');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setApiError(null);
    try {
      await registerUser(data.firstName, data.lastName, data.email, data.password, data.role);
      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please check details.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 w-full">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-md">
        <div className="text-center mb-8">
          <div className="inline-flex w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 items-center justify-center shadow-lg shadow-sky-500/20 mb-4">
            <span className="text-white font-bold text-2xl">X</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight">Create Account</h2>
          <p className="text-slate-400 mt-2 text-sm">Join the TalentBoardX recruitment platform</p>
        </div>

        {isSuccess ? (
          <div className="space-y-4 text-center py-6">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <h3 className="text-xl font-bold">Registration Successful!</h3>
            <p className="text-slate-400 text-sm">
              Your account has been created. Redirecting to sign in screen...
            </p>
            <div className="pt-2">
              <Link to="/login" className="text-sky-400 hover:underline font-semibold text-sm">
                Click here if not redirected automatically
              </Link>
            </div>
          </div>
        ) : (
          <>
            {apiError && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-lg text-xs mb-6 text-center">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Role Selection Switch */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3 p-1 bg-slate-950 border border-slate-800 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setValue('role', 'job_seeker')}
                    className={`py-2 text-xs font-bold rounded-md transition-all ${
                      selectedRole === 'job_seeker'
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Job Seeker
                  </button>
                  <button
                    type="button"
                    onClick={() => setValue('role', 'employer')}
                    className={`py-2 text-xs font-bold rounded-md transition-all ${
                      selectedRole === 'employer'
                        ? 'bg-sky-500 text-white shadow-md'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Employer
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    {...register('firstName')}
                    className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                      errors.firstName ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
                    }`}
                  />
                  {errors.firstName && (
                    <span className="text-xs text-rose-400 mt-1 block">{errors.firstName.message}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    {...register('lastName')}
                    className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                      errors.lastName ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
                    }`}
                  />
                  {errors.lastName && (
                    <span className="text-xs text-rose-400 mt-1 block">{errors.lastName.message}</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register('email')}
                  className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
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
                  className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
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
                  'Create Account'
                )}
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors">
                Sign in
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
