import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WorkProjectRegister from './work-project-register';
import WorkProjectRegisterDetail from './work-project-register-detail';
import WorkProjectRegisterUpdate from './work-project-register-update';
import WorkProjectRegisterDeleteDialog from './work-project-register-delete-dialog';

const WorkProjectRegisterRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WorkProjectRegister />} />
    <Route path="new" element={<WorkProjectRegisterUpdate />} />
    <Route path=":id">
      <Route index element={<WorkProjectRegisterDetail />} />
      <Route path="edit" element={<WorkProjectRegisterUpdate />} />
      <Route path="delete" element={<WorkProjectRegisterDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WorkProjectRegisterRoutes;
