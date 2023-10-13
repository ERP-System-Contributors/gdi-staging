import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import LeaseLiabilityScheduleItem from './lease-liability-schedule-item';
import LeaseLiabilityScheduleItemDetail from './lease-liability-schedule-item-detail';
import LeaseLiabilityScheduleItemUpdate from './lease-liability-schedule-item-update';
import LeaseLiabilityScheduleItemDeleteDialog from './lease-liability-schedule-item-delete-dialog';

const LeaseLiabilityScheduleItemRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<LeaseLiabilityScheduleItem />} />
    <Route path="new" element={<LeaseLiabilityScheduleItemUpdate />} />
    <Route path=":id">
      <Route index element={<LeaseLiabilityScheduleItemDetail />} />
      <Route path="edit" element={<LeaseLiabilityScheduleItemUpdate />} />
      <Route path="delete" element={<LeaseLiabilityScheduleItemDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default LeaseLiabilityScheduleItemRoutes;
