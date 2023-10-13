import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PrepaymentAmortization from './prepayment-amortization';
import PrepaymentAmortizationDetail from './prepayment-amortization-detail';
import PrepaymentAmortizationUpdate from './prepayment-amortization-update';
import PrepaymentAmortizationDeleteDialog from './prepayment-amortization-delete-dialog';

const PrepaymentAmortizationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PrepaymentAmortization />} />
    <Route path="new" element={<PrepaymentAmortizationUpdate />} />
    <Route path=":id">
      <Route index element={<PrepaymentAmortizationDetail />} />
      <Route path="edit" element={<PrepaymentAmortizationUpdate />} />
      <Route path="delete" element={<PrepaymentAmortizationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PrepaymentAmortizationRoutes;
