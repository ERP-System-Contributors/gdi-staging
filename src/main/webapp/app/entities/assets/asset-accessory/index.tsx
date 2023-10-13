import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AssetAccessory from './asset-accessory';
import AssetAccessoryDetail from './asset-accessory-detail';
import AssetAccessoryUpdate from './asset-accessory-update';
import AssetAccessoryDeleteDialog from './asset-accessory-delete-dialog';

const AssetAccessoryRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AssetAccessory />} />
    <Route path="new" element={<AssetAccessoryUpdate />} />
    <Route path=":id">
      <Route index element={<AssetAccessoryDetail />} />
      <Route path="edit" element={<AssetAccessoryUpdate />} />
      <Route path="delete" element={<AssetAccessoryDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AssetAccessoryRoutes;
