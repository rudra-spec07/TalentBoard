import { useState } from 'react';
import { FiTrash2, FiSave, FiRefreshCw } from 'react-icons/fi';

export const ProfileActions = ({ isSubmitting, onReset, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await onDelete();
    } catch (err) {
      console.error(err);
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Save/Reset Actions */}
        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-6 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-300 disabled:opacity-50"
          >
            <FiSave />
            <span>Save Profile</span>
          </button>
          
          <button
            type="button"
            onClick={onReset}
            disabled={isSubmitting}
            className="flex flex-items-center justify-center space-x-2 px-6 py-2.5 bg-slate-950 hover:bg-slate-900 text-slate-300 border border-slate-850 rounded-xl transition-all disabled:opacity-50"
          >
            <FiRefreshCw />
            <span>Reset</span>
          </button>
        </div>

        {/* Delete Action */}
        <button
          type="button"
          onClick={() => setShowModal(true)}
          disabled={isSubmitting}
          className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 hover:border-rose-500/40 text-rose-400 font-bold rounded-xl transition-all"
        >
          <FiTrash2 />
          <span>Deactivate Account</span>
        </button>
      </div>

      {/* Confirmation Modal overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm transition-all duration-300 animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-8 shadow-2xl relative">
            <h4 className="text-xl font-extrabold text-white mb-3">Deactivate Account?</h4>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Are you sure you want to deactivate your account? This will perform a soft-delete on your profile. Future login attempts and credentials verification will be blocked immediately.
            </p>
            
            <div className="flex items-center space-x-3 justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                disabled={isDeleting}
                className="px-5 py-2 text-xs font-bold text-slate-300 bg-slate-950 border border-slate-800 hover:bg-slate-900 rounded-xl transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                disabled={isDeleting}
                className="px-5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl shadow-lg shadow-rose-600/10 hover:shadow-rose-500/20 flex items-center justify-center space-x-1.5 transition-all"
              >
                {isDeleting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <FiTrash2 />
                    <span>Yes, Deactivate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileActions;
