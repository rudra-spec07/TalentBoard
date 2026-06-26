import React, { useState } from 'react';
import { FiMapPin, FiCpu, FiDollarSign, FiClock, FiLayers, FiX } from 'react-icons/fi';
import { JOB_TYPE, EXPERIENCE_LEVEL, JOB_TYPE_LABELS, EXPERIENCE_LEVEL_LABELS } from '../constants/job.constants';

/**
 * Filter panel aggregating Location, Skills, Salary range, Job Type and Experience Level selectors.
 */
export const FilterPanel = ({ filters, onChange }) => {
  const [skillInput, setSkillInput] = useState('');

  const handleSkillsAdd = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = skillInput.trim();
      if (val) {
        const currentList = filters.skills ? filters.skills.split(',').filter(Boolean) : [];
        if (!currentList.includes(val) && currentList.length < 20) {
          const updated = [...currentList, val].join(',');
          onChange({ skills: updated });
          setSkillInput('');
        }
      }
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const currentList = filters.skills ? filters.skills.split(',').filter(Boolean) : [];
    const updated = currentList.filter(s => s !== skillToRemove).join(',');
    onChange({ skills: updated });
  };

  const handleSalaryChange = (field, val) => {
    const numVal = val === '' ? '' : Number(val);
    onChange({ [field]: numVal });
  };

  const currentSkills = filters.skills ? filters.skills.split(',').filter(Boolean) : [];

  return (
    <div className="space-y-6 w-full text-left">
      {/* Location Filter */}
      <div className="space-y-2">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
          <FiMapPin />
          <span>Location</span>
        </label>
        <input
          type="text"
          value={filters.location}
          onChange={(e) => onChange({ location: e.target.value })}
          placeholder="City, state, or Remote"
          className="w-full px-3 py-2 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-350 focus:outline-none text-xs transition-all"
        />
      </div>

      {/* Skills search */}
      <div className="space-y-2">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
          <FiCpu />
          <span>Skills Required</span>
        </label>
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleSkillsAdd}
          placeholder="Type skill and press Enter"
          className="w-full px-3 py-2 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-350 focus:outline-none text-xs transition-all"
        />
        {/* Skills Chips */}
        {currentSkills.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentSkills.map((s, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 px-2 py-0.5 bg-slate-950 border border-slate-850 text-sky-400 rounded-md text-[9px] font-bold"
              >
                <span>{s}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(s)}
                  className="text-slate-500 hover:text-rose-400"
                >
                  <FiX className="w-2.5 h-2.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Salary Filter */}
      <div className="space-y-2">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
          <FiDollarSign />
          <span>Salary Budget</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            min="0"
            value={filters.salaryMin || ''}
            onChange={(e) => handleSalaryChange('salaryMin', e.target.value)}
            placeholder="Min Salary"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-350 focus:outline-none text-xs transition-all"
          />
          <input
            type="number"
            min="0"
            value={filters.salaryMax || ''}
            onChange={(e) => handleSalaryChange('salaryMax', e.target.value)}
            placeholder="Max Salary"
            className="w-full px-3 py-2 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-350 focus:outline-none text-xs transition-all"
          />
        </div>
      </div>

      {/* Job Type Dropdown */}
      <div className="space-y-2">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
          <FiClock />
          <span>Job Type</span>
        </label>
        <select
          value={filters.jobType}
          onChange={(e) => onChange({ jobType: e.target.value })}
          className="w-full px-3 py-2 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-300 focus:outline-none text-xs transition-all"
        >
          <option value="">All Types</option>
          {Object.values(JOB_TYPE).map(type => (
            <option key={type} value={type}>
              {JOB_TYPE_LABELS[type]}
            </option>
          ))}
        </select>
      </div>

      {/* Experience Level Dropdown */}
      <div className="space-y-2">
        <label className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center space-x-1.5">
          <FiLayers />
          <span>Experience Level</span>
        </label>
        <select
          value={filters.experienceLevel}
          onChange={(e) => onChange({ experienceLevel: e.target.value })}
          className="w-full px-3 py-2 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-300 focus:outline-none text-xs transition-all"
        >
          <option value="">All Experience Levels</option>
          {Object.values(EXPERIENCE_LEVEL).map(lvl => (
            <option key={lvl} value={lvl}>
              {EXPERIENCE_LEVEL_LABELS[lvl]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
