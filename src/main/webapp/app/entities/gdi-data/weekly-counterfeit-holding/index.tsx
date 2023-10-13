import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import WeeklyCounterfeitHolding from './weekly-counterfeit-holding';
import WeeklyCounterfeitHoldingDetail from './weekly-counterfeit-holding-detail';
import WeeklyCounterfeitHoldingUpdate from './weekly-counterfeit-holding-update';
import WeeklyCounterfeitHoldingDeleteDialog from './weekly-counterfeit-holding-delete-dialog';

const WeeklyCounterfeitHoldingRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<WeeklyCounterfeitHolding />} />
    <Route path="new" element={<WeeklyCounterfeitHoldingUpdate />} />
    <Route path=":id">
      <Route index element={<WeeklyCounterfeitHoldingDetail />} />
      <Route path="edit" element={<WeeklyCounterfeitHoldingUpdate />} />
      <Route path="delete" element={<WeeklyCounterfeitHoldingDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default WeeklyCounterfeitHoldingRoutes;
