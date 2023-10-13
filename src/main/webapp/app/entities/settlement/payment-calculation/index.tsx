import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PaymentCalculation from './payment-calculation';
import PaymentCalculationDetail from './payment-calculation-detail';
import PaymentCalculationUpdate from './payment-calculation-update';
import PaymentCalculationDeleteDialog from './payment-calculation-delete-dialog';

const PaymentCalculationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PaymentCalculation />} />
    <Route path="new" element={<PaymentCalculationUpdate />} />
    <Route path=":id">
      <Route index element={<PaymentCalculationDetail />} />
      <Route path="edit" element={<PaymentCalculationUpdate />} />
      <Route path="delete" element={<PaymentCalculationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PaymentCalculationRoutes;
