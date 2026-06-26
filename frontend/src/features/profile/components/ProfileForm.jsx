import { FiUser } from 'react-icons/fi';

export const ProfileForm = ({ register, errors }) => {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-6 w-full">
      <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
        <FiUser className="text-sky-500" />
        <span>Personal Details</span>
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Headline Input */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Professional Headline
          </label>
          <input
            type="text"
            placeholder="e.g. Senior Backend Engineer | Node.js Specialist"
            {...register('headline')}
            className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
              errors.headline ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
            }`}
          />
          {errors.headline && (
            <span className="text-xs text-rose-400 mt-1 block">{errors.headline.message}</span>
          )}
        </div>

        {/* Bio Textarea */}
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Short Biography
          </label>
          <textarea
            rows={4}
            placeholder="Introduce yourself, your core capacities, and work experiences..."
            {...register('bio')}
            className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all resize-none ${
              errors.bio ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
            }`}
          ></textarea>
          {errors.bio && (
            <span className="text-xs text-rose-400 mt-1 block">{errors.bio.message}</span>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Phone Number (International)
          </label>
          <input
            type="text"
            placeholder="e.g. +14155552671"
            {...register('phoneNumber')}
            className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
              errors.phoneNumber ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
            }`}
          />
          {errors.phoneNumber && (
            <span className="text-xs text-rose-400 mt-1 block">{errors.phoneNumber.message}</span>
          )}
        </div>

        {/* Avatar link (Optional override) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Avatar Image URL (Optional)
          </label>
          <input
            type="text"
            placeholder="https://example.com/avatar.jpg"
            {...register('avatar')}
            className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
              errors.avatar ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
            }`}
          />
          {errors.avatar && (
            <span className="text-xs text-rose-400 mt-1 block">{errors.avatar.message}</span>
          )}
        </div>

        {/* City */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            City
          </label>
          <input
            type="text"
            placeholder="e.g. San Francisco"
            {...register('city')}
            className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
              errors.city ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
            }`}
          />
          {errors.city && (
            <span className="text-xs text-rose-400 mt-1 block">{errors.city.message}</span>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Country
          </label>
          <input
            type="text"
            placeholder="e.g. United States"
            {...register('country')}
            className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
              errors.country ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
            }`}
          />
          {errors.country && (
            <span className="text-xs text-rose-400 mt-1 block">{errors.country.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
