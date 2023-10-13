import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PrepaymentMapping from './prepayment-mapping';
import PrepaymentMappingDetail from './prepayment-mapping-detail';
import PrepaymentMappingUpdate from './prepayment-mapping-update';
import PrepaymentMappingDeleteDialog from './prepayment-mapping-delete-dialog';

const PrepaymentMappingRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PrepaymentMapping />} />
    <Route path="new" element={<PrepaymentMappingUpdate />} />
    <Route path=":id">
      <Route index element={<PrepaymentMappingDetail />} />
      <Route path="edit" element={<PrepaymentMappingUpdate />} />
      <Route path="delete" element={<PrepaymentMappingDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PrepaymentMappingRoutes;
