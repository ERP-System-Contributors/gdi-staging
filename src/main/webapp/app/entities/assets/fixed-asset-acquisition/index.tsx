import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import FixedAssetAcquisition from './fixed-asset-acquisition';
import FixedAssetAcquisitionDetail from './fixed-asset-acquisition-detail';
import FixedAssetAcquisitionUpdate from './fixed-asset-acquisition-update';
import FixedAssetAcquisitionDeleteDialog from './fixed-asset-acquisition-delete-dialog';

const FixedAssetAcquisitionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<FixedAssetAcquisition />} />
    <Route path="new" element={<FixedAssetAcquisitionUpdate />} />
    <Route path=":id">
      <Route index element={<FixedAssetAcquisitionDetail />} />
      <Route path="edit" element={<FixedAssetAcquisitionUpdate />} />
      <Route path="delete" element={<FixedAssetAcquisitionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FixedAssetAcquisitionRoutes;
