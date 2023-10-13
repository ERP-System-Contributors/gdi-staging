import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CardState from './card-state';
import CardStateDetail from './card-state-detail';
import CardStateUpdate from './card-state-update';
import CardStateDeleteDialog from './card-state-delete-dialog';

const CardStateRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CardState />} />
    <Route path="new" element={<CardStateUpdate />} />
    <Route path=":id">
      <Route index element={<CardStateDetail />} />
      <Route path="edit" element={<CardStateUpdate />} />
      <Route path="delete" element={<CardStateDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CardStateRoutes;
