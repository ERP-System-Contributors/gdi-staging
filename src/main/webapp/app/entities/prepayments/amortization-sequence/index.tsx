import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AmortizationSequence from './amortization-sequence';
import AmortizationSequenceDetail from './amortization-sequence-detail';
import AmortizationSequenceUpdate from './amortization-sequence-update';
import AmortizationSequenceDeleteDialog from './amortization-sequence-delete-dialog';

const AmortizationSequenceRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AmortizationSequence />} />
    <Route path="new" element={<AmortizationSequenceUpdate />} />
    <Route path=":id">
      <Route index element={<AmortizationSequenceDetail />} />
      <Route path="edit" element={<AmortizationSequenceUpdate />} />
      <Route path="delete" element={<AmortizationSequenceDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AmortizationSequenceRoutes;
