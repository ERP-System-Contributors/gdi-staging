import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WeeklyCashHolding from './weekly-cash-holding';
import WeeklyCashHoldingDetail from './weekly-cash-holding-detail';
import WeeklyCashHoldingUpdate from './weekly-cash-holding-update';
import WeeklyCashHoldingDeleteDialog from './weekly-cash-holding-delete-dialog';

const WeeklyCashHoldingRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WeeklyCashHolding />} />
    <Route path="new" element={<WeeklyCashHoldingUpdate />} />
    <Route path=":id">
      <Route index element={<WeeklyCashHoldingDetail />} />
      <Route path="edit" element={<WeeklyCashHoldingUpdate />} />
      <Route path="delete" element={<WeeklyCashHoldingDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WeeklyCashHoldingRoutes;
