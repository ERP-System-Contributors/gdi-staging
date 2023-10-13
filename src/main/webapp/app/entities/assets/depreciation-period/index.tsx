import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DepreciationPeriod from './depreciation-period';
import DepreciationPeriodDetail from './depreciation-period-detail';
import DepreciationPeriodUpdate from './depreciation-period-update';
import DepreciationPeriodDeleteDialog from './depreciation-period-delete-dialog';

const DepreciationPeriodRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DepreciationPeriod />} />
    <Route path="new" element={<DepreciationPeriodUpdate />} />
    <Route path=":id">
      <Route index element={<DepreciationPeriodDetail />} />
      <Route path="edit" element={<DepreciationPeriodUpdate />} />
      <Route path="delete" element={<DepreciationPeriodDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DepreciationPeriodRoutes;
