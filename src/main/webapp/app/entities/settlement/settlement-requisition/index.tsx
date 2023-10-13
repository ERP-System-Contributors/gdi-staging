import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import SettlementRequisition from './settlement-requisition';
import SettlementRequisitionDetail from './settlement-requisition-detail';
import SettlementRequisitionUpdate from './settlement-requisition-update';
import SettlementRequisitionDeleteDialog from './settlement-requisition-delete-dialog';

const SettlementRequisitionRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<SettlementRequisition />} />
    <Route path="new" element={<SettlementRequisitionUpdate />} />
    <Route path=":id">
      <Route index element={<SettlementRequisitionDetail />} />
      <Route path="edit" element={<SettlementRequisitionUpdate />} />
      <Route path="delete" element={<SettlementRequisitionDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default SettlementRequisitionRoutes;
