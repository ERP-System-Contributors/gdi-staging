import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ReportRequisition from './report-requisition';
import ReportRequisitionDetail from './report-requisition-detail';
import ReportRequisitionUpdate from './report-requisition-update';
import ReportRequisitionDeleteDialog from './report-requisition-delete-dialog';

const ReportRequisitionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ReportRequisition />} />
    <Route path="new" element={<ReportRequisitionUpdate />} />
    <Route path=":id">
      <Route index element={<ReportRequisitionDetail />} />
      <Route path="edit" element={<ReportRequisitionUpdate />} />
      <Route path="delete" element={<ReportRequisitionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ReportRequisitionRoutes;
