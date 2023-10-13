import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LeaseModelMetadata from './lease-model-metadata';
import LeaseModelMetadataDetail from './lease-model-metadata-detail';
import LeaseModelMetadataUpdate from './lease-model-metadata-update';
import LeaseModelMetadataDeleteDialog from './lease-model-metadata-delete-dialog';

const LeaseModelMetadataRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LeaseModelMetadata />} />
    <Route path="new" element={<LeaseModelMetadataUpdate />} />
    <Route path=":id">
      <Route index element={<LeaseModelMetadataDetail />} />
      <Route path="edit" element={<LeaseModelMetadataUpdate />} />
      <Route path="delete" element={<LeaseModelMetadataDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LeaseModelMetadataRoutes;
