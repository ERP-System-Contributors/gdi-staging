import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import FiscalMonth from './fiscal-month';
import FiscalMonthDetail from './fiscal-month-detail';
import FiscalMonthUpdate from './fiscal-month-update';
import FiscalMonthDeleteDialog from './fiscal-month-delete-dialog';

const FiscalMonthRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<FiscalMonth />} />
    <Route path="new" element={<FiscalMonthUpdate />} />
    <Route path=":id">
      <Route index element={<FiscalMonthDetail />} />
      <Route path="edit" element={<FiscalMonthUpdate />} />
      <Route path="delete" element={<FiscalMonthDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FiscalMonthRoutes;
