import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WorkInProgressTransfer from './work-in-progress-transfer';
import WorkInProgressTransferDetail from './work-in-progress-transfer-detail';
import WorkInProgressTransferUpdate from './work-in-progress-transfer-update';
import WorkInProgressTransferDeleteDialog from './work-in-progress-transfer-delete-dialog';

const WorkInProgressTransferRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WorkInProgressTransfer />} />
    <Route path="new" element={<WorkInProgressTransferUpdate />} />
    <Route path=":id">
      <Route index element={<WorkInProgressTransferDetail />} />
      <Route path="edit" element={<WorkInProgressTransferUpdate />} />
      <Route path="delete" element={<WorkInProgressTransferDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WorkInProgressTransferRoutes;
