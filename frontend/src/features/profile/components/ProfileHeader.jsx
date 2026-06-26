import { FiMail, FiMapPin, FiUser } from 'react-icons/fi';
import { getFullName } from '../utils/profile.helpers';

export const ProfileHeader = ({ profile }) => {
  if (!profile) return null;

  const fullName = getFullName(profile);
  const userRole = profile.role === 'job_seeker' ? 'Job Seeker' : profile.role === 'employer' ? 'Employer' : 'Administrator';

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-md relative overflow-hidden w-full">
      {/* Decorative gradient overlay */}
      <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-sky-500/5 blur-3xl rounded-full"></div>
      <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full"></div>

      <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 relative z-10">
        {/* Avatar section */}
        <div className="relative group shrink-0">
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 shadow-lg shadow-sky-500/10">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={fullName}
                className="w-full h-full object-cover rounded-2xl bg-slate-950"
              />
            ) : (
              <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center text-slate-400">
                <FiUser className="w-12 h-12 text-slate-500" />
              </div>
            )}
          </div>
        </div>

        {/* Text descriptions */}
        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row items-center sm:space-x-3 justify-center md:justify-start">
              <h2 className="text-3xl font-extrabold text-white tracking-tight">{fullName}</h2>
              <span className="mt-2 sm:mt-0 px-3 py-1 text-xs font-bold bg-sky-500/10 text-sky-400 rounded-full border border-sky-500/20 uppercase tracking-wider">
                {userRole}
              </span>
            </div>
            {profile.headline ? (
              <p className="text-sky-400 font-medium text-sm mt-2">{profile.headline}</p>
            ) : (
              <p className="text-slate-500 text-xs italic mt-2">No headline configured yet</p>
            )}
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-y-2 gap-x-6 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <FiMail className="text-slate-500" />
              <span>{profile.email}</span>
            </div>
            {(profile.city || profile.country) && (
              <div className="flex items-center space-x-2">
                <FiMapPin className="text-slate-500" />
                <span>
                  {[profile.city, profile.country].filter(Boolean).join(', ')}
                </span>
              </div>
            )}
          </div>

          {profile.bio ? (
            <p className="text-slate-300 text-sm leading-relaxed max-w-3xl pt-2 border-t border-slate-800/60">
              {profile.bio}
            </p>
          ) : (
            <p className="text-slate-600 text-xs italic pt-2 border-t border-slate-800/60">
              No biography provided yet. Edit your profile details to fill in your story.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
