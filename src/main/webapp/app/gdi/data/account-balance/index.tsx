import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AccountBalance from './account-balance';
import AccountBalanceDetail from './account-balance-detail';
import AccountBalanceUpdate from './account-balance-update';
import AccountBalanceDeleteDialog from './account-balance-delete-dialog';

const AccountBalanceRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AccountBalance />} />
    <Route path="new" element={<AccountBalanceUpdate />} />
    <Route path=":id">
      <Route index element={<AccountBalanceDetail />} />
      <Route path="edit" element={<AccountBalanceUpdate />} />
      <Route path="delete" element={<AccountBalanceDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AccountBalanceRoutes;
