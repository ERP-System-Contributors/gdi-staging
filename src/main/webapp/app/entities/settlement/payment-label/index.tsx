import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PaymentLabel from './payment-label';
import PaymentLabelDetail from './payment-label-detail';
import PaymentLabelUpdate from './payment-label-update';
import PaymentLabelDeleteDialog from './payment-label-delete-dialog';

const PaymentLabelRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PaymentLabel />} />
    <Route path="new" element={<PaymentLabelUpdate />} />
    <Route path=":id">
      <Route index element={<PaymentLabelDetail />} />
      <Route path="edit" element={<PaymentLabelUpdate />} />
      <Route path="delete" element={<PaymentLabelDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PaymentLabelRoutes;
