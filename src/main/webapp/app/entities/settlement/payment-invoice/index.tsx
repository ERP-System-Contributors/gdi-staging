import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PaymentInvoice from './payment-invoice';
import PaymentInvoiceDetail from './payment-invoice-detail';
import PaymentInvoiceUpdate from './payment-invoice-update';
import PaymentInvoiceDeleteDialog from './payment-invoice-delete-dialog';

const PaymentInvoiceRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PaymentInvoice />} />
    <Route path="new" element={<PaymentInvoiceUpdate />} />
    <Route path=":id">
      <Route index element={<PaymentInvoiceDetail />} />
      <Route path="edit" element={<PaymentInvoiceUpdate />} />
      <Route path="delete" element={<PaymentInvoiceDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PaymentInvoiceRoutes;
