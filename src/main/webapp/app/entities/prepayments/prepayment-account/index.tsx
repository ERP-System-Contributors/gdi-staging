import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PrepaymentAccount from './prepayment-account';
import PrepaymentAccountDetail from './prepayment-account-detail';
import PrepaymentAccountUpdate from './prepayment-account-update';
import PrepaymentAccountDeleteDialog from './prepayment-account-delete-dialog';

const PrepaymentAccountRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PrepaymentAccount />} />
    <Route path="new" element={<PrepaymentAccountUpdate />} />
    <Route path=":id">
      <Route index element={<PrepaymentAccountDetail />} />
      <Route path="edit" element={<PrepaymentAccountUpdate />} />
      <Route path="delete" element={<PrepaymentAccountDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PrepaymentAccountRoutes;
