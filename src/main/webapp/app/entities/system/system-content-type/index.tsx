import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SystemContentType from './system-content-type';
import SystemContentTypeDetail from './system-content-type-detail';
import SystemContentTypeUpdate from './system-content-type-update';
import SystemContentTypeDeleteDialog from './system-content-type-delete-dialog';

const SystemContentTypeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SystemContentType />} />
    <Route path="new" element={<SystemContentTypeUpdate />} />
    <Route path=":id">
      <Route index element={<SystemContentTypeDetail />} />
      <Route path="edit" element={<SystemContentTypeUpdate />} />
      <Route path="delete" element={<SystemContentTypeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SystemContentTypeRoutes;
