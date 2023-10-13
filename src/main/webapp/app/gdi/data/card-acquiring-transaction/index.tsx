import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CardAcquiringTransaction from './card-acquiring-transaction';
import CardAcquiringTransactionDetail from './card-acquiring-transaction-detail';
import CardAcquiringTransactionUpdate from './card-acquiring-transaction-update';
import CardAcquiringTransactionDeleteDialog from './card-acquiring-transaction-delete-dialog';

const CardAcquiringTransactionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CardAcquiringTransaction />} />
    <Route path="new" element={<CardAcquiringTransactionUpdate />} />
    <Route path=":id">
      <Route index element={<CardAcquiringTransactionDetail />} />
      <Route path="edit" element={<CardAcquiringTransactionUpdate />} />
      <Route path="delete" element={<CardAcquiringTransactionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CardAcquiringTransactionRoutes;
