import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '../../../routes/ProtectedRoute';
import MyApplicationsPage from '../pages/MyApplicationsPage';
import ApplicationDetailsPage from '../pages/ApplicationDetailsPage';
import ApplicantsPage from '../pages/employer/ApplicantsPage';

export const getApplicationRoutes = () => {
  return (
    <>
      {/* Seeker only routes */}
      <Route element={<ProtectedRoute allowedRoles={['job_seeker']} />}>
        <Route path="/applications" element={<MyApplicationsPage />} />
        <Route path="/applications/:id" element={<ApplicationDetailsPage />} />
      </Route>

      {/* Employer only routes */}
      <Route element={<ProtectedRoute allowedRoles={['employer', 'admin']} />}>
        <Route path="/employer/jobs/:jobId/applicants" element={<ApplicantsPage />} />
      </Route>
    </>
  );
};

export default getApplicationRoutes;
