import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AssetRegistration from './asset-registration';
import AssetRegistrationDetail from './asset-registration-detail';
import AssetRegistrationUpdate from './asset-registration-update';
import AssetRegistrationDeleteDialog from './asset-registration-delete-dialog';

const AssetRegistrationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AssetRegistration />} />
    <Route path="new" element={<AssetRegistrationUpdate />} />
    <Route path=":id">
      <Route index element={<AssetRegistrationDetail />} />
      <Route path="edit" element={<AssetRegistrationUpdate />} />
      <Route path="delete" element={<AssetRegistrationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AssetRegistrationRoutes;
