import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Algorithm from './algorithm';
import AlgorithmDetail from './algorithm-detail';
import AlgorithmUpdate from './algorithm-update';
import AlgorithmDeleteDialog from './algorithm-delete-dialog';

const AlgorithmRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Algorithm />} />
    <Route path="new" element={<AlgorithmUpdate />} />
    <Route path=":id">
      <Route index element={<AlgorithmDetail />} />
      <Route path="edit" element={<AlgorithmUpdate />} />
      <Route path="delete" element={<AlgorithmDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AlgorithmRoutes;
