import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ExchangeRate from './exchange-rate';
import ExchangeRateDetail from './exchange-rate-detail';
import ExchangeRateUpdate from './exchange-rate-update';
import ExchangeRateDeleteDialog from './exchange-rate-delete-dialog';

const ExchangeRateRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ExchangeRate />} />
    <Route path="new" element={<ExchangeRateUpdate />} />
    <Route path=":id">
      <Route index element={<ExchangeRateDetail />} />
      <Route path="edit" element={<ExchangeRateUpdate />} />
      <Route path="delete" element={<ExchangeRateDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ExchangeRateRoutes;
