import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import FiscalQuarter from './fiscal-quarter';
import FiscalQuarterDetail from './fiscal-quarter-detail';
import FiscalQuarterUpdate from './fiscal-quarter-update';
import FiscalQuarterDeleteDialog from './fiscal-quarter-delete-dialog';

const FiscalQuarterRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<FiscalQuarter />} />
    <Route path="new" element={<FiscalQuarterUpdate />} />
    <Route path=":id">
      <Route index element={<FiscalQuarterDetail />} />
      <Route path="edit" element={<FiscalQuarterUpdate />} />
      <Route path="delete" element={<FiscalQuarterDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FiscalQuarterRoutes;
