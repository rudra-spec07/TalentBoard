import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import useProfile from '../hooks/useProfile';
import { profileSchema } from '../validation/profile.schema';

// Child components
import ProfileHeader from '../components/ProfileHeader';
import ProfileForm from '../components/ProfileForm';
import ProfileLinks from '../components/ProfileLinks';
import ProfileSkills from '../components/ProfileSkills';
import ResumeUploader from '../components/ResumeUploader';
import ProfileActions from '../components/ProfileActions';

import { FiArrowLeft, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const {
    profile,
    loading,
    error,
    updateProfile,
    uploadResume,
    deactivateAccount,
    refreshProfile
  } = useProfile();

  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(profileSchema)
  });

  // Re-populate default values when profile resolves from backend
  useEffect(() => {
    if (profile) {
      reset({
        headline: profile.headline || '',
        bio: profile.bio || '',
        city: profile.city || '',
        country: profile.country || '',
        phoneNumber: profile.phoneNumber || '',
        githubUrl: profile.githubUrl || '',
        linkedinUrl: profile.linkedinUrl || '',
        portfolioUrl: profile.portfolioUrl || '',
        avatar: profile.avatar || '',
        skills: profile.skills || []
      });
    }
  }, [profile, reset]);

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const onSubmit = async (data) => {
    try {
      await updateProfile(data);
      triggerToast('Profile updated successfully!', 'success');
    } catch (err) {
      triggerToast(err.message || 'Failed to update profile.', 'error');
    }
  };

  const handleResumeUpload = async (file, onProgress) => {
    try {
      await uploadResume(file, onProgress);
      triggerToast('Resume uploaded successfully!', 'success');
    } catch (err) {
      triggerToast(err.message || 'Resume upload failed.', 'error');
      throw err;
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deactivateAccount();
      triggerToast('Account deactivated successfully.', 'success');
      setTimeout(() => {
        logout();
        navigate('/login');
      }, 1500);
    } catch (err) {
      triggerToast(err.message || 'Failed to deactivate account.', 'error');
    }
  };

  const handleResetForm = () => {
    if (profile) {
      reset({
        headline: profile.headline || '',
        bio: profile.bio || '',
        city: profile.city || '',
        country: profile.country || '',
        phoneNumber: profile.phoneNumber || '',
        githubUrl: profile.githubUrl || '',
        linkedinUrl: profile.linkedinUrl || '',
        portfolioUrl: profile.portfolioUrl || '',
        avatar: profile.avatar || '',
        skills: profile.skills || []
      });
      triggerToast('Changes reset to last saved state.', 'success');
    }
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col max-w-7xl mx-auto px-6 py-10 space-y-8 w-full">
        {/* Skeleton Header */}
        <div className="bg-slate-900/40 border border-slate-850 rounded-3xl p-8 h-40 animate-pulse flex items-center space-x-6">
          <div className="w-20 h-20 rounded-2xl bg-slate-800"></div>
          <div className="flex-1 space-y-3">
            <div className="w-1/4 h-6 bg-slate-800 rounded"></div>
            <div className="w-1/3 h-4 bg-slate-800 rounded"></div>
          </div>
        </div>

        {/* Skeleton Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 h-60 animate-pulse"></div>
            <div className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 h-40 animate-pulse"></div>
          </div>
          <div className="space-y-6">
            <div className="bg-slate-900/40 border border-slate-850 rounded-3xl p-6 h-60 animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 w-full">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 text-center shadow-xl">
          <FiAlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Error Loading Profile</h3>
          <p className="text-sm text-slate-400 mb-6">{error}</p>
          <button
            onClick={refreshProfile}
            className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full pb-16">
      {/* Toast Alert Banner */}
      {toast.show && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`p-4 rounded-2xl shadow-2xl flex items-center space-x-3 border ${
            toast.type === 'success' 
              ? 'bg-emerald-950/90 border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-950/90 border-rose-500/20 text-rose-400'
          }`}>
            {toast.type === 'success' ? <FiCheckCircle className="w-5 h-5" /> : <FiAlertCircle className="w-5 h-5" />}
            <span className="text-sm font-semibold">{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header Profile Title */}
      <div className="max-w-7xl w-full mx-auto px-6 pt-10 pb-6 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="p-2.5 bg-slate-900 hover:bg-slate-850 border border-slate-850 rounded-xl text-slate-400 hover:text-white transition-colors">
            <FiArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">Manage Profile</h1>
            <p className="text-xs text-slate-400">Configure your professional details and resume settings</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl w-full mx-auto px-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Header Overview Card */}
          <ProfileHeader profile={profile} />

          <div className="grid lg:grid-cols-3 gap-8 items-start">
            {/* Left Column (Forms & Details) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Personal Details Form */}
              <ProfileForm register={register} errors={errors} />

              {/* Dynamic Skills Panel */}
              <Controller
                name="skills"
                control={control}
                render={({ field }) => (
                  <ProfileSkills skills={field.value} onChange={field.onChange} />
                )}
              />

              {/* Bottom Actions Card */}
              <ProfileActions
                isSubmitting={isSubmitting}
                onReset={handleResetForm}
                onDelete={handleDeleteAccount}
              />
            </div>

            {/* Right Column (Attachments & Links) */}
            <div className="space-y-8">
              {/* Resume Attachment Manager */}
              <ResumeUploader
                resumeUrl={profile?.resumeUrl}
                onUpload={handleResumeUpload}
              />

              {/* URL Portals Card */}
              <ProfileLinks register={register} errors={errors} />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
