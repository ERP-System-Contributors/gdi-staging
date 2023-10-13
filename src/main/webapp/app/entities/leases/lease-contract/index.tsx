import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LeaseContract from './lease-contract';
import LeaseContractDetail from './lease-contract-detail';
import LeaseContractUpdate from './lease-contract-update';
import LeaseContractDeleteDialog from './lease-contract-delete-dialog';

const LeaseContractRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LeaseContract />} />
    <Route path="new" element={<LeaseContractUpdate />} />
    <Route path=":id">
      <Route index element={<LeaseContractDetail />} />
      <Route path="edit" element={<LeaseContractUpdate />} />
      <Route path="delete" element={<LeaseContractDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LeaseContractRoutes;
