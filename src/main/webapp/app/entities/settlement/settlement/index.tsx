import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Settlement from './settlement';
import SettlementDetail from './settlement-detail';
import SettlementUpdate from './settlement-update';
import SettlementDeleteDialog from './settlement-delete-dialog';

const SettlementRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Settlement />} />
    <Route path="new" element={<SettlementUpdate />} />
    <Route path=":id">
      <Route index element={<SettlementDetail />} />
      <Route path="edit" element={<SettlementUpdate />} />
      <Route path="delete" element={<SettlementDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SettlementRoutes;
