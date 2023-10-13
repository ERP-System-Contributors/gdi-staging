import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ContractMetadata from './contract-metadata';
import ContractMetadataDetail from './contract-metadata-detail';
import ContractMetadataUpdate from './contract-metadata-update';
import ContractMetadataDeleteDialog from './contract-metadata-delete-dialog';

const ContractMetadataRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ContractMetadata />} />
    <Route path="new" element={<ContractMetadataUpdate />} />
    <Route path=":id">
      <Route index element={<ContractMetadataDetail />} />
      <Route path="edit" element={<ContractMetadataUpdate />} />
      <Route path="delete" element={<ContractMetadataDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ContractMetadataRoutes;
