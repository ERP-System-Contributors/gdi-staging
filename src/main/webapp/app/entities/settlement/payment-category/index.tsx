import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PaymentCategory from './payment-category';
import PaymentCategoryDetail from './payment-category-detail';
import PaymentCategoryUpdate from './payment-category-update';
import PaymentCategoryDeleteDialog from './payment-category-delete-dialog';

const PaymentCategoryRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PaymentCategory />} />
    <Route path="new" element={<PaymentCategoryUpdate />} />
    <Route path=":id">
      <Route index element={<PaymentCategoryDetail />} />
      <Route path="edit" element={<PaymentCategoryUpdate />} />
      <Route path="delete" element={<PaymentCategoryDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PaymentCategoryRoutes;
