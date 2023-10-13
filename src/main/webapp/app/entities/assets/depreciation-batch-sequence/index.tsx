import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DepreciationBatchSequence from './depreciation-batch-sequence';
import DepreciationBatchSequenceDetail from './depreciation-batch-sequence-detail';
import DepreciationBatchSequenceUpdate from './depreciation-batch-sequence-update';
import DepreciationBatchSequenceDeleteDialog from './depreciation-batch-sequence-delete-dialog';

const DepreciationBatchSequenceRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DepreciationBatchSequence />} />
    <Route path="new" element={<DepreciationBatchSequenceUpdate />} />
    <Route path=":id">
      <Route index element={<DepreciationBatchSequenceDetail />} />
      <Route path="edit" element={<DepreciationBatchSequenceUpdate />} />
      <Route path="delete" element={<DepreciationBatchSequenceDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DepreciationBatchSequenceRoutes;
