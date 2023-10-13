import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WorkInProgressRegistration from './work-in-progress-registration';
import WorkInProgressRegistrationDetail from './work-in-progress-registration-detail';
import WorkInProgressRegistrationUpdate from './work-in-progress-registration-update';
import WorkInProgressRegistrationDeleteDialog from './work-in-progress-registration-delete-dialog';

const WorkInProgressRegistrationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WorkInProgressRegistration />} />
    <Route path="new" element={<WorkInProgressRegistrationUpdate />} />
    <Route path=":id">
      <Route index element={<WorkInProgressRegistrationDetail />} />
      <Route path="edit" element={<WorkInProgressRegistrationUpdate />} />
      <Route path="delete" element={<WorkInProgressRegistrationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WorkInProgressRegistrationRoutes;
