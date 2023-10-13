import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DepreciationJob from './depreciation-job';
import DepreciationJobDetail from './depreciation-job-detail';
import DepreciationJobUpdate from './depreciation-job-update';
import DepreciationJobDeleteDialog from './depreciation-job-delete-dialog';

const DepreciationJobRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DepreciationJob />} />
    <Route path="new" element={<DepreciationJobUpdate />} />
    <Route path=":id">
      <Route index element={<DepreciationJobDetail />} />
      <Route path="edit" element={<DepreciationJobUpdate />} />
      <Route path="delete" element={<DepreciationJobDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DepreciationJobRoutes;
