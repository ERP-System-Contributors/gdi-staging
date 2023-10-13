import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DepreciationEntry from './depreciation-entry';
import DepreciationEntryDetail from './depreciation-entry-detail';
import DepreciationEntryUpdate from './depreciation-entry-update';
import DepreciationEntryDeleteDialog from './depreciation-entry-delete-dialog';

const DepreciationEntryRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DepreciationEntry />} />
    <Route path="new" element={<DepreciationEntryUpdate />} />
    <Route path=":id">
      <Route index element={<DepreciationEntryDetail />} />
      <Route path="edit" element={<DepreciationEntryUpdate />} />
      <Route path="delete" element={<DepreciationEntryDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DepreciationEntryRoutes;
