import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../../../routes/ProtectedRoute';
import JobsPage from '../pages/JobsPage';
import JobDetailsPage from '../pages/JobDetailsPage';
import MyJobsPage from '../employer/MyJobsPage';
import CreateJobPage from '../employer/CreateJobPage';
import EditJobPage from '../employer/EditJobPage';

export const getJobRoutes = () => {
  return (
    <>
      {/* Seeker / Guest Public Job Listings */}
      <Route path="/jobs" element={<JobsPage />} />
      <Route path="/jobs/:jobId" element={<JobDetailsPage />} />

      {/* Protected Employer Job Management */}
      <Route element={<ProtectedRoute allowedRoles={['employer']} />}>
        <Route path="/employer/jobs" element={<MyJobsPage />} />
        <Route path="/employer/jobs/create" element={<CreateJobPage />} />
        <Route path="/employer/jobs/:jobId/edit" element={<EditJobPage />} />
      </Route>
    </>
  );
};

export default getJobRoutes;
