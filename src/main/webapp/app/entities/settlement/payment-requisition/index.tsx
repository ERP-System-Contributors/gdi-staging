import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PaymentRequisition from './payment-requisition';
import PaymentRequisitionDetail from './payment-requisition-detail';
import PaymentRequisitionUpdate from './payment-requisition-update';
import PaymentRequisitionDeleteDialog from './payment-requisition-delete-dialog';

const PaymentRequisitionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PaymentRequisition />} />
    <Route path="new" element={<PaymentRequisitionUpdate />} />
    <Route path=":id">
      <Route index element={<PaymentRequisitionDetail />} />
      <Route path="edit" element={<PaymentRequisitionUpdate />} />
      <Route path="delete" element={<PaymentRequisitionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PaymentRequisitionRoutes;
