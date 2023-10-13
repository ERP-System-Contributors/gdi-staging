import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ProcessStatus from './process-status';
import ProcessStatusDetail from './process-status-detail';
import ProcessStatusUpdate from './process-status-update';
import ProcessStatusDeleteDialog from './process-status-delete-dialog';

const ProcessStatusRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ProcessStatus />} />
    <Route path="new" element={<ProcessStatusUpdate />} />
    <Route path=":id">
      <Route index element={<ProcessStatusDetail />} />
      <Route path="edit" element={<ProcessStatusUpdate />} />
      <Route path="delete" element={<ProcessStatusDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ProcessStatusRoutes;
