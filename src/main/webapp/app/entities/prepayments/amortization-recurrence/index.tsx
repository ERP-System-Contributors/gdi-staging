import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AmortizationRecurrence from './amortization-recurrence';
import AmortizationRecurrenceDetail from './amortization-recurrence-detail';
import AmortizationRecurrenceUpdate from './amortization-recurrence-update';
import AmortizationRecurrenceDeleteDialog from './amortization-recurrence-delete-dialog';

const AmortizationRecurrenceRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AmortizationRecurrence />} />
    <Route path="new" element={<AmortizationRecurrenceUpdate />} />
    <Route path=":id">
      <Route index element={<AmortizationRecurrenceDetail />} />
      <Route path="edit" element={<AmortizationRecurrenceUpdate />} />
      <Route path="delete" element={<AmortizationRecurrenceDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AmortizationRecurrenceRoutes;
