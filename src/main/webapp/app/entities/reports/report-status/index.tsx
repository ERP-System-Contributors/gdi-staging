import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ReportStatus from './report-status';
import ReportStatusDetail from './report-status-detail';
import ReportStatusUpdate from './report-status-update';
import ReportStatusDeleteDialog from './report-status-delete-dialog';

const ReportStatusRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ReportStatus />} />
    <Route path="new" element={<ReportStatusUpdate />} />
    <Route path=":id">
      <Route index element={<ReportStatusDetail />} />
      <Route path="edit" element={<ReportStatusUpdate />} />
      <Route path="delete" element={<ReportStatusDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ReportStatusRoutes;
