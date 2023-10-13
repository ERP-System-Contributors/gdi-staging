import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AccountAttributeMetadata from './account-attribute-metadata';
import AccountAttributeMetadataDetail from './account-attribute-metadata-detail';
import AccountAttributeMetadataUpdate from './account-attribute-metadata-update';
import AccountAttributeMetadataDeleteDialog from './account-attribute-metadata-delete-dialog';

const AccountAttributeMetadataRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AccountAttributeMetadata />} />
    <Route path="new" element={<AccountAttributeMetadataUpdate />} />
    <Route path=":id">
      <Route index element={<AccountAttributeMetadataDetail />} />
      <Route path="edit" element={<AccountAttributeMetadataUpdate />} />
      <Route path="delete" element={<AccountAttributeMetadataDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AccountAttributeMetadataRoutes;
