import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import FiscalYear from './fiscal-year';
import FiscalYearDetail from './fiscal-year-detail';
import FiscalYearUpdate from './fiscal-year-update';
import FiscalYearDeleteDialog from './fiscal-year-delete-dialog';

const FiscalYearRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<FiscalYear />} />
    <Route path="new" element={<FiscalYearUpdate />} />
    <Route path=":id">
      <Route index element={<FiscalYearDetail />} />
      <Route path="edit" element={<FiscalYearUpdate />} />
      <Route path="delete" element={<FiscalYearDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FiscalYearRoutes;
