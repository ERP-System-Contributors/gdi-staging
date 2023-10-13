import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import FixedAssetNetBookValue from './fixed-asset-net-book-value';
import FixedAssetNetBookValueDetail from './fixed-asset-net-book-value-detail';
import FixedAssetNetBookValueUpdate from './fixed-asset-net-book-value-update';
import FixedAssetNetBookValueDeleteDialog from './fixed-asset-net-book-value-delete-dialog';

const FixedAssetNetBookValueRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<FixedAssetNetBookValue />} />
    <Route path="new" element={<FixedAssetNetBookValueUpdate />} />
    <Route path=":id">
      <Route index element={<FixedAssetNetBookValueDetail />} />
      <Route path="edit" element={<FixedAssetNetBookValueUpdate />} />
      <Route path="delete" element={<FixedAssetNetBookValueDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FixedAssetNetBookValueRoutes;
