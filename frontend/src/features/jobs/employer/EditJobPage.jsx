import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiArrowLeft, FiEdit, FiAlertCircle } from 'react-icons/fi';
import useJob from '../hooks/useJob';
import useUpdateJob from '../hooks/useUpdateJob';
import JobForm from '../components/JobForm';
import { updateJobSchema } from '../validation/job.schema';
import useAuth from '../../../hooks/useAuth';

export const EditJobPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { job, loading: isJobLoading, error: jobError, refetch } = useJob(jobId);
  const { update, isSubmitting: isApiSubmitting } = useUpdateJob();
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(updateJobSchema),
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
      salaryMin: '',
      salaryMax: '',
      currency: 'USD',
      vacancies: 1,
      applicationDeadline: '',
      status: ''
    }
  });

  // Populate form with loaded job details
  useEffect(() => {
    if (job) {
      const formattedDeadline = job.applicationDeadline
        ? new Date(job.applicationDeadline).toISOString().split('T')[0]
        : '';
      
      reset({
        title: job.title || '',
        companyName: job.companyName || '',
        companyLogo: job.companyLogo || '',
        description: job.description || '',
        responsibilities: job.responsibilities || '',
        requirements: job.requirements || '',
        skillsRequired: job.skillsRequired || [],
        benefits: job.benefits || [],
        location: job.location || '',
        jobType: job.jobType || '',
        experienceLevel: job.experienceLevel || '',
        salaryMin: job.salaryMin ?? '',
        salaryMax: job.salaryMax ?? '',
        currency: job.currency || 'USD',
        vacancies: job.vacancies ?? 1,
        applicationDeadline: formattedDeadline,
        status: job.status || ''
      });
    }
  }, [job, reset]);

  const onSubmit = async (data) => {
    setSubmitError(null);
    try {
      // Clean up fields before updating
      const cleanData = {
        ...data,
        salaryMin: data.salaryMin === '' ? null : Number(data.salaryMin),
        salaryMax: data.salaryMax === '' ? null : Number(data.salaryMax),
        vacancies: Number(data.vacancies)
      };
      
      // Remove status so backend Zod strict check doesn't reject the payload
      delete cleanData.status;
      
      await update(jobId, cleanData);
      navigate(user?.role === 'admin' ? '/dashboard' : '/employer/jobs');
    } catch (err) {
      setSubmitError(err.message || 'An error occurred while updating the job listing.');
    }
  };

  if (isJobLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col max-w-4xl mx-auto px-6 py-10 space-y-8 w-full">
        <div className="h-10 bg-slate-900/40 border border-slate-800 rounded-xl w-48 animate-pulse"></div>
        <div className="h-[500px] bg-slate-900/40 border border-slate-800 rounded-3xl animate-pulse"></div>
      </div>
    );
  }

  if (jobError) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 w-full">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center space-y-4">
          <FiAlertCircle className="w-12 h-12 text-rose-500 mx-auto" />
          <h3 className="text-xl font-bold text-white">Error Loading Job</h3>
          <p className="text-sm text-slate-455">{jobError}</p>
          <button
            onClick={refetch}
            className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl transition-all"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

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
              <FiEdit className="text-sky-500" />
              <span>Edit Job Listing</span>
            </span>
          </div>
        </div>
      </header>

      {/* Form Content */}
      <main className="max-w-4xl w-full mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight">Edit Job Listing</h1>
          <p className="text-sm text-slate-400 mt-1">Make changes to the job posting description, requirements, or compensation details.</p>
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
              className="px-6 py-3 text-sm font-bold bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-355 border border-slate-850 rounded-xl transition-all"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={isSubmitting || isApiSubmitting}
              className="px-6 py-3 text-sm font-bold bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white rounded-xl shadow-lg shadow-sky-500/10 hover:shadow-sky-500/20 transition-all duration-300"
            >
              {isSubmitting || isApiSubmitting ? 'Saving Changes...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EditJobPage;
