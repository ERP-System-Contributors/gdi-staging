import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ReportContentType from './report-content-type';
import ReportContentTypeDetail from './report-content-type-detail';
import ReportContentTypeUpdate from './report-content-type-update';
import ReportContentTypeDeleteDialog from './report-content-type-delete-dialog';

const ReportContentTypeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ReportContentType />} />
    <Route path="new" element={<ReportContentTypeUpdate />} />
    <Route path=":id">
      <Route index element={<ReportContentTypeDetail />} />
      <Route path="edit" element={<ReportContentTypeUpdate />} />
      <Route path="delete" element={<ReportContentTypeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ReportContentTypeRoutes;
