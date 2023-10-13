import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PerformanceOfForeignSubsidiaries from './performance-of-foreign-subsidiaries';
import PerformanceOfForeignSubsidiariesDetail from './performance-of-foreign-subsidiaries-detail';
import PerformanceOfForeignSubsidiariesUpdate from './performance-of-foreign-subsidiaries-update';
import PerformanceOfForeignSubsidiariesDeleteDialog from './performance-of-foreign-subsidiaries-delete-dialog';

const PerformanceOfForeignSubsidiariesRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PerformanceOfForeignSubsidiaries />} />
    <Route path="new" element={<PerformanceOfForeignSubsidiariesUpdate />} />
    <Route path=":id">
      <Route index element={<PerformanceOfForeignSubsidiariesDetail />} />
      <Route path="edit" element={<PerformanceOfForeignSubsidiariesUpdate />} />
      <Route path="delete" element={<PerformanceOfForeignSubsidiariesDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PerformanceOfForeignSubsidiariesRoutes;
