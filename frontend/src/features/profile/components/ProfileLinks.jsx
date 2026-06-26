import { FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';

export const ProfileLinks = ({ register, errors }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-6 w-full">
      <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
        <FiGlobe className="text-sky-500" />
        <span>Professional Links</span>
      </h3>

      <div className="space-y-4">
        {/* LinkedIn Link */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            LinkedIn Profile URL
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <FiLinkedin className="w-5 h-5 text-indigo-400" />
            </div>
            <input
              type="text"
              placeholder="https://linkedin.com/in/username"
              {...register('linkedinUrl')}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.linkedinUrl ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
          </div>
          {errors.linkedinUrl && (
            <span className="text-xs text-rose-400 mt-1 block">{errors.linkedinUrl.message}</span>
          )}
        </div>

        {/* GitHub Link */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            GitHub Profile URL
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <FiGithub className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="https://github.com/username"
              {...register('githubUrl')}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.githubUrl ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
          </div>
          {errors.githubUrl && (
            <span className="text-xs text-rose-400 mt-1 block">{errors.githubUrl.message}</span>
          )}
        </div>

        {/* Portfolio Link */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Portfolio / Personal Website URL
          </label>
          <div className="relative rounded-lg shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <FiGlobe className="w-5 h-5 text-sky-400" />
            </div>
            <input
              type="text"
              placeholder="https://mywebsite.com"
              {...register('portfolioUrl')}
              className={`w-full pl-10 pr-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.portfolioUrl ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
          </div>
          {errors.portfolioUrl && (
            <span className="text-xs text-rose-400 mt-1 block">{errors.portfolioUrl.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileLinks;
