import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export const DashboardPage = () => {
  const { user, logout } = useAuth();

  const renderRoleDashboard = () => {
    switch (user?.role) {
      case 'job_seeker':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">My Application Portal</h3>
              <p className="text-sm text-slate-400 mb-6">
                Upload your resume and analyze matches against active role listings.
              </p>
              <div className="border border-dashed border-slate-700 rounded-lg p-8 text-center bg-slate-950/50 hover:border-sky-500/40 transition-colors cursor-pointer group">
                <span className="text-slate-500 group-hover:text-sky-400 block text-3xl mb-2">↑</span>
                <span className="text-xs text-slate-400 block font-semibold">Upload PDF/DOCX Resume</span>
                <span className="text-[10px] text-slate-600 block mt-1">Maximum file size: 5MB</span>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">My Applications History</h3>
              <p className="text-sm text-slate-400 mb-6">Track matching score outcomes and suggestions.</p>
              <div className="space-y-3">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Senior Backend Dev</h4>
                    <span className="text-[10px] text-slate-500">Google Ltd.</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-400 px-2 py-0.5 bg-emerald-500/10 rounded-full border border-emerald-500/20">85% Match</span>
                  </div>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Full-Stack Engineer</h4>
                    <span className="text-[10px] text-slate-500">TalentBoardX Inc.</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-sky-400 px-2 py-0.5 bg-sky-500/10 rounded-full border border-sky-500/20">72% Match</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'employer':
        return (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Employer Core Actions</h3>
              <p className="text-sm text-slate-400 mb-6">Manage job posts and view applicant matches.</p>
              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 rounded-xl text-center transition-all group">
                  <span className="block text-2xl mb-1 text-sky-400">⊕</span>
                  <span className="text-xs font-bold text-white block">Post a Job</span>
                </button>
                <button className="p-4 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/20 rounded-xl text-center transition-all group">
                  <span className="block text-2xl mb-1 text-indigo-400">👁</span>
                  <span className="text-xs font-bold text-white block">Applicants List</span>
                </button>
              </div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Recent Candidate Matches</h3>
              <p className="text-sm text-slate-400 mb-6">AI reports from recent application screeners.</p>
              <div className="space-y-3">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Alice Johnson</h4>
                    <span className="text-[10px] text-slate-500">React Dev Applicant</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-400">92% Match</span>
                </div>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white">Bob Smith</h4>
                    <span className="text-[10px] text-slate-500">Node JS Applicant</span>
                  </div>
                  <span className="text-xs font-bold text-amber-400">64% Match</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Welcome, System Admin</h3>
            <p className="text-slate-400 text-sm max-w-lg mx-auto">
              You possess global access privileges. Moderate job listings, audit users accounts, and manage database connection settings from the admin panel.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow">
              <span className="text-white font-bold text-md">X</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">Dashboard</span>
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden sm:flex flex-col text-right">
              <Link to="/profile" className="text-sm font-bold text-slate-200 hover:text-sky-400 transition-colors">
                {user?.firstName && user?.lastName ? `${user.firstName} ${user.lastName}` : user?.firstName || user?.email || 'User'}
              </Link>
              <span className="text-[10px] text-sky-400 font-semibold uppercase tracking-wider">
                {user?.role?.replace('_', ' ')}
              </span>
            </div>
            <Link
              to="/profile"
              className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-300 border border-slate-800 rounded-lg transition-all"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-300 border border-slate-800 rounded-lg transition-all"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10">
        {/* Welcome Card */}
        <div className="bg-gradient-to-r from-sky-500/10 via-indigo-500/5 to-transparent border border-sky-500/10 rounded-3xl p-8 mb-10 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-500/5 blur-3xl rounded-full"></div>
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-extrabold text-white mb-2">Hello, {user?.firstName || 'User'}!</h2>
              <p className="text-slate-400 text-sm max-w-xl">
                Welcome to your **TalentBoardX** workspace. Here you can find matching scores, manage configurations, and perform action tasks.
              </p>
            </div>
            <Link
              to="/profile"
              className="self-start md:self-auto px-6 py-3 text-sm font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-300 shrink-0"
            >
              Complete Profile Setup
            </Link>
          </div>
        </div>

        {/* Dynamic Panels */}
        {renderRoleDashboard()}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-600 w-full mt-auto">
        &copy; 2026 TalentBoardX Portal. Secure Admin Session.
      </footer>
    </div>
  );
};

export default DashboardPage;
