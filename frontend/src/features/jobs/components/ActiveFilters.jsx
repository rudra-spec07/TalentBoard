import React from 'react';
import { FiX } from 'react-icons/fi';
import { JOB_TYPE_LABELS, EXPERIENCE_LEVEL_LABELS } from '../constants/job.constants';

/**
 * Renders filter chips for the active search criteria.
 */
export const ActiveFilters = ({ filters, onRemove }) => {
  const activeChips = [];

  if (filters.location) {
    activeChips.push({ label: `Location: ${filters.location}`, key: 'location' });
  }

  if (filters.jobType) {
    const label = JOB_TYPE_LABELS[filters.jobType] || filters.jobType;
    activeChips.push({ label: `Type: ${label}`, key: 'jobType' });
  }

  if (filters.experienceLevel) {
    const label = EXPERIENCE_LEVEL_LABELS[filters.experienceLevel] || filters.experienceLevel;
    activeChips.push({ label: `Exp: ${label}`, key: 'experienceLevel' });
  }

  if (filters.salaryMin || filters.salaryMax) {
    let label = '';
    if (filters.salaryMin && filters.salaryMax) {
      label = `Salary: $${Number(filters.salaryMin).toLocaleString()} - $${Number(filters.salaryMax).toLocaleString()}`;
    } else if (filters.salaryMin) {
      label = `Salary: >= $${Number(filters.salaryMin).toLocaleString()}`;
    } else {
      label = `Salary: <= $${Number(filters.salaryMax).toLocaleString()}`;
    }
    activeChips.push({ label, key: ['salaryMin', 'salaryMax'] });
  }

  if (filters.skills) {
    const skillsList = filters.skills.split(',').filter(Boolean);
    skillsList.forEach((skill) => {
      activeChips.push({
        label: `Skill: ${skill}`,
        key: 'skills',
        value: skill
      });
    });
  }

  if (activeChips.length === 0) return null;

  const handleChipRemove = (chip) => {
    if (Array.isArray(chip.key)) {
      const updates = {};
      chip.key.forEach(k => { updates[k] = ''; });
      onRemove(updates);
    } else if (chip.key === 'skills') {
      const remainingSkills = filters.skills
        .split(',')
        .filter(s => s !== chip.value)
        .join(',');
      onRemove({ skills: remainingSkills });
    } else {
      onRemove({ [chip.key]: '' });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center text-xs py-2 w-full text-left">
      <span className="text-slate-500 font-bold uppercase tracking-wider text-[9px] mr-1">Active:</span>
      {activeChips.map((chip, idx) => (
        <span
          key={idx}
          className="inline-flex items-center space-x-1 px-2.5 py-1 bg-slate-900 border border-slate-800 text-slate-300 rounded-full"
        >
          <span>{chip.label}</span>
          <button
            type="button"
            onClick={() => handleChipRemove(chip)}
            className="w-3 h-3 rounded-full flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
            aria-label={`Clear filter chip ${chip.label}`}
          >
            <FiX className="w-2.5 h-2.5" />
          </button>
        </span>
      ))}
      <button
        type="button"
        onClick={() => {
          onRemove({
            location: '',
            jobType: '',
            experienceLevel: '',
            salaryMin: '',
            salaryMax: '',
            skills: ''
          });
        }}
        className="text-[9px] font-bold text-sky-400 hover:text-sky-350 uppercase tracking-wider pl-1.5 transition-colors"
      >
        Clear All
      </button>
    </div>
  );
};

export default ActiveFilters;
