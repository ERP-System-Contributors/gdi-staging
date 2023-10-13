import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AccountAttribute from './account-attribute';
import AccountAttributeDetail from './account-attribute-detail';
import AccountAttributeUpdate from './account-attribute-update';
import AccountAttributeDeleteDialog from './account-attribute-delete-dialog';

const AccountAttributeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AccountAttribute />} />
    <Route path="new" element={<AccountAttributeUpdate />} />
    <Route path=":id">
      <Route index element={<AccountAttributeDetail />} />
      <Route path="edit" element={<AccountAttributeUpdate />} />
      <Route path="delete" element={<AccountAttributeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AccountAttributeRoutes;
