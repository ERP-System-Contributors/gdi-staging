import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TerminalsAndPOS from './terminals-and-pos';
import TerminalsAndPOSDetail from './terminals-and-pos-detail';
import TerminalsAndPOSUpdate from './terminals-and-pos-update';
import TerminalsAndPOSDeleteDialog from './terminals-and-pos-delete-dialog';

const TerminalsAndPOSRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TerminalsAndPOS />} />
    <Route path="new" element={<TerminalsAndPOSUpdate />} />
    <Route path=":id">
      <Route index element={<TerminalsAndPOSDetail />} />
      <Route path="edit" element={<TerminalsAndPOSUpdate />} />
      <Route path="delete" element={<TerminalsAndPOSDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TerminalsAndPOSRoutes;
