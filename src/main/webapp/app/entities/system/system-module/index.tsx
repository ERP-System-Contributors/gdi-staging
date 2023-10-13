import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SystemModule from './system-module';
import SystemModuleDetail from './system-module-detail';
import SystemModuleUpdate from './system-module-update';
import SystemModuleDeleteDialog from './system-module-delete-dialog';

const SystemModuleRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SystemModule />} />
    <Route path="new" element={<SystemModuleUpdate />} />
    <Route path=":id">
      <Route index element={<SystemModuleDetail />} />
      <Route path="edit" element={<SystemModuleUpdate />} />
      <Route path="delete" element={<SystemModuleDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SystemModuleRoutes;
