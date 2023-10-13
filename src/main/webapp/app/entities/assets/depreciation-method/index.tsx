import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DepreciationMethod from './depreciation-method';
import DepreciationMethodDetail from './depreciation-method-detail';
import DepreciationMethodUpdate from './depreciation-method-update';
import DepreciationMethodDeleteDialog from './depreciation-method-delete-dialog';

const DepreciationMethodRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DepreciationMethod />} />
    <Route path="new" element={<DepreciationMethodUpdate />} />
    <Route path=":id">
      <Route index element={<DepreciationMethodDetail />} />
      <Route path="edit" element={<DepreciationMethodUpdate />} />
      <Route path="delete" element={<DepreciationMethodDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DepreciationMethodRoutes;
