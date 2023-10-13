import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SignedPayment from './signed-payment';
import SignedPaymentDetail from './signed-payment-detail';
import SignedPaymentUpdate from './signed-payment-update';
import SignedPaymentDeleteDialog from './signed-payment-delete-dialog';

const SignedPaymentRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SignedPayment />} />
    <Route path="new" element={<SignedPaymentUpdate />} />
    <Route path=":id">
      <Route index element={<SignedPaymentDetail />} />
      <Route path="edit" element={<SignedPaymentUpdate />} />
      <Route path="delete" element={<SignedPaymentDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SignedPaymentRoutes;
