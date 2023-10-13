import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ExcelReportExport from './excel-report-export';
import ExcelReportExportDetail from './excel-report-export-detail';
import ExcelReportExportUpdate from './excel-report-export-update';
import ExcelReportExportDeleteDialog from './excel-report-export-delete-dialog';

const ExcelReportExportRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ExcelReportExport />} />
    <Route path="new" element={<ExcelReportExportUpdate />} />
    <Route path=":id">
      <Route index element={<ExcelReportExportDetail />} />
      <Route path="edit" element={<ExcelReportExportUpdate />} />
      <Route path="delete" element={<ExcelReportExportDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ExcelReportExportRoutes;
