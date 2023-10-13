import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AssetWarranty from './asset-warranty';
import AssetWarrantyDetail from './asset-warranty-detail';
import AssetWarrantyUpdate from './asset-warranty-update';
import AssetWarrantyDeleteDialog from './asset-warranty-delete-dialog';

const AssetWarrantyRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AssetWarranty />} />
    <Route path="new" element={<AssetWarrantyUpdate />} />
    <Route path=":id">
      <Route index element={<AssetWarrantyDetail />} />
      <Route path="edit" element={<AssetWarrantyUpdate />} />
      <Route path="delete" element={<AssetWarrantyDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AssetWarrantyRoutes;
