import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PdfReportRequisition from './pdf-report-requisition';
import PdfReportRequisitionDetail from './pdf-report-requisition-detail';
import PdfReportRequisitionUpdate from './pdf-report-requisition-update';
import PdfReportRequisitionDeleteDialog from './pdf-report-requisition-delete-dialog';

const PdfReportRequisitionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PdfReportRequisition />} />
    <Route path="new" element={<PdfReportRequisitionUpdate />} />
    <Route path=":id">
      <Route index element={<PdfReportRequisitionDetail />} />
      <Route path="edit" element={<PdfReportRequisitionUpdate />} />
      <Route path="delete" element={<PdfReportRequisitionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PdfReportRequisitionRoutes;
