import { useState } from 'react';
import { FiX, FiCpu } from 'react-icons/fi';

export const ProfileSkills = ({ skills = [], onChange }) => {
  const [inputValue, setInputValue] = useState('');
  const [skillError, setSkillError] = useState(null);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent profile form submission
      
      const trimmed = inputValue.trim();
      if (!trimmed) return;

      // Validate length limits
      if (skills.length >= 20) {
        setSkillError('Maximum of 20 skills allowed.');
        return;
      }

      const lowercasedInput = trimmed.toLowerCase();
      const isDuplicate = skills.some(s => s.toLowerCase() === lowercasedInput);

      if (isDuplicate) {
        setSkillError('Skill already added.');
        return;
      }

      // Append and clear input
      const updatedSkills = [...skills, trimmed];
      onChange(updatedSkills);
      setInputValue('');
      setSkillError(null);
    }
  };

  const removeSkill = (indexToRemove) => {
    const updatedSkills = skills.filter((_, idx) => idx !== indexToRemove);
    onChange(updatedSkills);
    setSkillError(null);
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-4 w-full">
      <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
        <FiCpu className="text-sky-500" />
        <span>Skills Inventory</span>
      </h3>

      <div className="space-y-3">
        {/* Input box */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Add Skill (Press Enter)
          </label>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              if (skillError) setSkillError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type skill (e.g. React) and press Enter"
            className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all"
          />
          {skillError && (
            <span className="text-xs text-rose-400 mt-1 block">{skillError}</span>
          )}
        </div>

        {/* Skill chips wrapper */}
        <div className="flex flex-wrap gap-2 pt-2">
          {skills.length > 0 ? (
            skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold bg-sky-500/10 text-sky-400 rounded-full border border-sky-500/20 group hover:bg-sky-500/20 transition-all duration-200"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(index)}
                  className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/25 transition-all"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              </span>
            ))
          ) : (
            <span className="text-slate-600 text-xs italic">
              No skills selected yet. Add your core capabilities above.
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSkills;
