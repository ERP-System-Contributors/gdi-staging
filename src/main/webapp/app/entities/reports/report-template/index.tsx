import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ReportTemplate from './report-template';
import ReportTemplateDetail from './report-template-detail';
import ReportTemplateUpdate from './report-template-update';
import ReportTemplateDeleteDialog from './report-template-delete-dialog';

const ReportTemplateRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ReportTemplate />} />
    <Route path="new" element={<ReportTemplateUpdate />} />
    <Route path=":id">
      <Route index element={<ReportTemplateDetail />} />
      <Route path="edit" element={<ReportTemplateUpdate />} />
      <Route path="delete" element={<ReportTemplateDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ReportTemplateRoutes;
