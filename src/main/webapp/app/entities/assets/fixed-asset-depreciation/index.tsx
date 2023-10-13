import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import FixedAssetDepreciation from './fixed-asset-depreciation';
import FixedAssetDepreciationDetail from './fixed-asset-depreciation-detail';
import FixedAssetDepreciationUpdate from './fixed-asset-depreciation-update';
import FixedAssetDepreciationDeleteDialog from './fixed-asset-depreciation-delete-dialog';

const FixedAssetDepreciationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<FixedAssetDepreciation />} />
    <Route path="new" element={<FixedAssetDepreciationUpdate />} />
    <Route path=":id">
      <Route index element={<FixedAssetDepreciationDetail />} />
      <Route path="edit" element={<FixedAssetDepreciationUpdate />} />
      <Route path="delete" element={<FixedAssetDepreciationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FixedAssetDepreciationRoutes;
