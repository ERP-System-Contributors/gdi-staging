import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import XlsxReportRequisition from './xlsx-report-requisition';
import XlsxReportRequisitionDetail from './xlsx-report-requisition-detail';
import XlsxReportRequisitionUpdate from './xlsx-report-requisition-update';
import XlsxReportRequisitionDeleteDialog from './xlsx-report-requisition-delete-dialog';

const XlsxReportRequisitionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<XlsxReportRequisition />} />
    <Route path="new" element={<XlsxReportRequisitionUpdate />} />
    <Route path=":id">
      <Route index element={<XlsxReportRequisitionDetail />} />
      <Route path="edit" element={<XlsxReportRequisitionUpdate />} />
      <Route path="delete" element={<XlsxReportRequisitionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default XlsxReportRequisitionRoutes;
