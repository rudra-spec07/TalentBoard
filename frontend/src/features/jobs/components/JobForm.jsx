import React, { useState } from 'react';
import { FiX, FiCpu, FiPlus, FiBriefcase, FiDollarSign, FiEdit } from 'react-icons/fi';
import { JOB_TYPE, EXPERIENCE_LEVEL } from '../constants/job.constants';

export const JobForm = ({ 
  register, 
  errors, 
  control, 
  setValue, 
  watch, 
  isSubmitting 
}) => {
  const [skillInput, setSkillInput] = useState('');
  const [benefitInput, setBenefitInput] = useState('');

  const currentSkills = watch('skillsRequired') || [];
  const currentBenefits = watch('benefits') || [];

  const handleAddSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = skillInput.trim();
      if (val && !currentSkills.includes(val) && currentSkills.length < 20) {
        setValue('skillsRequired', [...currentSkills, val]);
        setSkillInput('');
      }
    }
  };

  const handleAddSkillBtn = () => {
    const val = skillInput.trim();
    if (val && !currentSkills.includes(val) && currentSkills.length < 20) {
      setValue('skillsRequired', [...currentSkills, val]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (idx) => {
    const updated = currentSkills.filter((_, i) => i !== idx);
    setValue('skillsRequired', updated);
  };

  const handleAddBenefit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const val = benefitInput.trim();
      if (val && !currentBenefits.includes(val)) {
        setValue('benefits', [...currentBenefits, val]);
        setBenefitInput('');
      }
    }
  };

  const handleAddBenefitBtn = () => {
    const val = benefitInput.trim();
    if (val && !currentBenefits.includes(val)) {
      setValue('benefits', [...currentBenefits, val]);
      setBenefitInput('');
    }
  };

  const handleRemoveBenefit = (idx) => {
    const updated = currentBenefits.filter((_, i) => i !== idx);
    setValue('benefits', updated);
  };

  return (
    <div className="space-y-8 w-full text-left">
      {/* 1. Basic Information */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
          <FiBriefcase className="text-sky-500" />
          <span>Basic Information</span>
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Job Title */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Job Title
            </label>
            <input
              type="text"
              placeholder="e.g. Senior Backend Engineer"
              {...register('title')}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.title ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
            {errors.title && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.title.message}</span>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Company Name
            </label>
            <input
              type="text"
              placeholder="e.g. TalentBoardX Ltd."
              {...register('companyName')}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.companyName ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
            {errors.companyName && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.companyName.message}</span>
            )}
          </div>

          {/* Company Logo URL */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Company Logo Image URL
            </label>
            <input
              type="text"
              placeholder="https://example.com/logo.png"
              {...register('companyLogo')}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.companyLogo ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
            {errors.companyLogo && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.companyLogo.message}</span>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Location / Office
            </label>
            <input
              type="text"
              placeholder="e.g. San Francisco, CA / Remote"
              {...register('location')}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.location ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
            {errors.location && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.location.message}</span>
            )}
          </div>

          {/* Job Type Dropdown */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Job Type
            </label>
            <select
              {...register('jobType')}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.jobType ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            >
              <option value="">Select Job Type</option>
              <option value={JOB_TYPE.FULL_TIME}>Full-Time</option>
              <option value={JOB_TYPE.PART_TIME}>Part-Time</option>
              <option value={JOB_TYPE.CONTRACT}>Contract</option>
              <option value={JOB_TYPE.INTERNSHIP}>Internship</option>
              <option value={JOB_TYPE.REMOTE}>Remote</option>
            </select>
            {errors.jobType && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.jobType.message}</span>
            )}
          </div>

          {/* Experience Level Dropdown */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Experience Level Required
            </label>
            <select
              {...register('experienceLevel')}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.experienceLevel ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            >
              <option value="">Select Experience Level</option>
              <option value={EXPERIENCE_LEVEL.ENTRY}>Entry Level</option>
              <option value={EXPERIENCE_LEVEL.MID}>Mid Level</option>
              <option value={EXPERIENCE_LEVEL.SENIOR}>Senior Level</option>
              <option value={EXPERIENCE_LEVEL.LEAD}>Lead Role</option>
              <option value={EXPERIENCE_LEVEL.DIRECTOR}>Director / Executive</option>
            </select>
            {errors.experienceLevel && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.experienceLevel.message}</span>
            )}
          </div>

          {/* Vacancies count */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Open Vacancies Count
            </label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 2"
              {...register('vacancies', { valueAsNumber: true })}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.vacancies ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
            {errors.vacancies && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.vacancies.message}</span>
            )}
          </div>

          {/* Application Deadline */}
          <div className="md:col-span-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Application Deadline
            </label>
            <input
              type="date"
              {...register('applicationDeadline')}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.applicationDeadline ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
            {errors.applicationDeadline && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.applicationDeadline.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Detailed Descriptions */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
          <FiEdit className="text-sky-500" />
          <span>Job Descriptions & Details</span>
        </h3>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Full Job Description
            </label>
            <textarea
              rows={5}
              placeholder="Provide a detailed overview of the role, team context, and target duties..."
              {...register('description')}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all resize-none ${
                errors.description ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            ></textarea>
            {errors.description && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.description.message}</span>
            )}
          </div>

          {/* Key Responsibilities */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Key Responsibilities
            </label>
            <textarea
              rows={4}
              placeholder="e.g. Write clean code, construct databases, deploy cloud services..."
              {...register('responsibilities')}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all resize-none ${
                errors.responsibilities ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            ></textarea>
            {errors.responsibilities && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.responsibilities.message}</span>
            )}
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Requirements & Experience
            </label>
            <textarea
              rows={4}
              placeholder="e.g. 5+ years experience, expert MERN stack knowledge, strong team cooperation..."
              {...register('requirements')}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all resize-none ${
                errors.requirements ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            ></textarea>
            {errors.requirements && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.requirements.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* 3. Salary & Compensation */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
          <FiDollarSign className="text-sky-500" />
          <span>Compensation range</span>
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Salary Min */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Minimum Salary (Yearly)
            </label>
            <input
              type="number"
              placeholder="e.g. 80000"
              {...register('salaryMin', { valueAsNumber: true })}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.salaryMin ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
            {errors.salaryMin && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.salaryMin.message}</span>
            )}
          </div>

          {/* Salary Max */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Maximum Salary (Yearly)
            </label>
            <input
              type="number"
              placeholder="e.g. 120000"
              {...register('salaryMax', { valueAsNumber: true })}
              className={`w-full px-4 py-2.5 bg-slate-950 border rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.salaryMax ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
            {errors.salaryMax && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.salaryMax.message}</span>
            )}
          </div>

          {/* Currency */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Currency
            </label>
            <input
              type="text"
              placeholder="USD"
              {...register('currency')}
              className={`w-full px-4 py-2.5 bg-slate-950 border border-slate-800 focus:border-sky-500 rounded-lg text-slate-100 placeholder-slate-650 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all ${
                errors.currency ? 'border-rose-500/50' : 'border-slate-800 focus:border-sky-500'
              }`}
            />
            {errors.currency && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.currency.message}</span>
            )}
          </div>
        </div>
      </div>

      {/* 4. Skills & Benefits */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-md space-y-6">
        <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3 flex items-center space-x-2">
          <FiCpu className="text-sky-500" />
          <span>Skills Inventory & Benefits</span>
        </h3>

        <div className="space-y-6">
          {/* SkillsRequired Chip list */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Required Skills (Press Enter to Add)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Type skill (e.g. React) and press Enter"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all"
              />
              <button
                type="button"
                onClick={handleAddSkillBtn}
                className="p-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg transition-colors flex items-center justify-center shrink-0"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>
            {errors.skillsRequired && (
              <span className="text-xs text-rose-400 mt-1 block">{errors.skillsRequired.message}</span>
            )}
            
            {/* Skills chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {currentSkills.length > 0 ? (
                currentSkills.map((skill, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold bg-sky-500/10 text-sky-400 rounded-full border border-sky-500/20"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index)}
                      className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/25 transition-all"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-slate-600 text-xs italic">No skills added yet (Required).</span>
              )}
            </div>
          </div>

          {/* Benefits Chip list */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Benefits & Perks (Press Enter to Add)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={benefitInput}
                onChange={(e) => setBenefitInput(e.target.value)}
                onKeyDown={handleAddBenefit}
                placeholder="Type benefit (e.g. Remote work) and press Enter"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-850 focus:border-sky-500 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500/30 transition-all"
              />
              <button
                type="button"
                onClick={handleAddBenefitBtn}
                className="p-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg transition-colors flex items-center justify-center shrink-0"
              >
                <FiPlus className="w-5 h-5" />
              </button>
            </div>
            
            {/* Benefits chips */}
            <div className="flex flex-wrap gap-2 mt-3">
              {currentBenefits.length > 0 ? (
                currentBenefits.map((benefit, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold bg-indigo-550/10 text-indigo-400 rounded-full border border-indigo-550/20"
                  >
                    <span>{benefit}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBenefit(index)}
                      className="w-4 h-4 rounded-full flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/25 transition-all"
                    >
                      <FiX className="w-3 h-3" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-slate-650 text-xs italic">No benefits configured yet (Optional).</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobForm;
