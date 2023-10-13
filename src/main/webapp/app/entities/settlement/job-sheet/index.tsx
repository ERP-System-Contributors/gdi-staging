import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import JobSheet from './job-sheet';
import JobSheetDetail from './job-sheet-detail';
import JobSheetUpdate from './job-sheet-update';
import JobSheetDeleteDialog from './job-sheet-delete-dialog';

const JobSheetRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<JobSheet />} />
    <Route path="new" element={<JobSheetUpdate />} />
    <Route path=":id">
      <Route index element={<JobSheetDetail />} />
      <Route path="edit" element={<JobSheetUpdate />} />
      <Route path="delete" element={<JobSheetDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default JobSheetRoutes;
