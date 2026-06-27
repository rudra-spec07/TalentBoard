import React, { useState } from 'react';

export const WithdrawButton = ({ onWithdraw, isLoading, className = '' }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-rose-400 font-medium">Are you sure?</span>
        <button
          type="button"
          disabled={isLoading}
          onClick={() => {
            onWithdraw();
            setShowConfirm(false);
          }}
          className="px-2.5 py-1 text-xs bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors font-medium"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setShowConfirm(false)}
          className="px-2.5 py-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors font-medium"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowConfirm(true)}
      className={`text-xs text-rose-400 hover:text-rose-300 transition-colors font-medium ${className}`}
    >
      Withdraw Application
    </button>
  );
};

export default WithdrawButton;
