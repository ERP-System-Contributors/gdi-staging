import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SecurityClearance from './security-clearance';
import SecurityClearanceDetail from './security-clearance-detail';
import SecurityClearanceUpdate from './security-clearance-update';
import SecurityClearanceDeleteDialog from './security-clearance-delete-dialog';

const SecurityClearanceRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SecurityClearance />} />
    <Route path="new" element={<SecurityClearanceUpdate />} />
    <Route path=":id">
      <Route index element={<SecurityClearanceDetail />} />
      <Route path="edit" element={<SecurityClearanceUpdate />} />
      <Route path="delete" element={<SecurityClearanceDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SecurityClearanceRoutes;
