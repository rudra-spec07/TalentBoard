import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiArrowLeft, FiPlusCircle } from 'react-icons/fi';
import useCreateJob from '../hooks/useCreateJob';
import JobForm from '../components/JobForm';
import { createJobSchema } from '../validation/job.schema';
import { JOB_STATUS } from '../constants/job.constants';
import useAuth from '../../../hooks/useAuth';

export const CreateJobPage = () => {
  const navigate = useNavigate();
  const { create, isSubmitting: isApiSubmitting } = useCreateJob();
  const { user } = useAuth();
  const [submitError, setSubmitError] = useState(null);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 14); // default deadline is 14 days from now

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(createJobSchema),
    defaultValues: {
      title: '',
      companyName: '',
      companyLogo: '',
      description: '',
      responsibilities: '',
      requirements: '',
      skillsRequired: [],
      benefits: [],
      location: '',
      jobType: '',
      experienceLevel: '',
      salaryMin: null,
      salaryMax: null,
      currency: 'USD',
      vacancies: 1,
      applicationDeadline: tomorrow.toISOString().split('T')[0],
      status: JOB_STATUS.DRAFT
    }
  });

  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      await create(data);
      navigate(user?.role === 'admin' ? '/dashboard' : '/employer/jobs');
    } catch (err) {
      setSubmitError(err.message || 'An error occurred while creating the job listing.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans w-full pb-20 text-left">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-900/50 backdrop-blur px-6 py-4 w-full sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link to="/employer/jobs" className="p-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded-xl text-slate-400 hover:text-white transition-colors mr-1">
              <FiArrowLeft className="w-4 h-4" />
            </Link>
            <span className="font-extrabold text-xl tracking-tight text-white flex items-center space-x-2">
              <FiPlusCircle className="text-sky-500" />
              <span>Post a Job</span>
            </span>
          </div>
        </div>
      </header>

      {/* Form Content */}
      <main className="max-w-4xl w-full mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Create Job Listing</h1>
          <p className="text-sm text-slate-400 mt-1">Provide role specifications, candidate expectations, and salary details.</p>
        </div>

        {submitError && (
          <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-455 rounded-xl text-sm font-semibold">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <JobForm
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            watch={watch}
            isSubmitting={isSubmitting || isApiSubmitting}
          />

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-slate-900">
            <Link
              to="/employer/jobs"
              className="px-6 py-3 text-sm font-bold bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-350 border border-slate-850 rounded-xl transition-all"
            >
              Cancel
            </Link>
            
            <button
              type="submit"
              onClick={() => setValue('status', JOB_STATUS.DRAFT)}
              disabled={isSubmitting || isApiSubmitting}
              className="px-6 py-3 text-sm font-bold bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-300 border border-slate-800 rounded-xl transition-all"
            >
              Save as Draft
            </button>

            <button
              type="submit"
              onClick={() => setValue('status', JOB_STATUS.OPEN)}
              disabled={isSubmitting || isApiSubmitting}
              className="px-6 py-3 text-sm font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-300"
            >
              {isSubmitting || isApiSubmitting ? 'Creating...' : 'Publish Immediately'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateJobPage;
