import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BusinessTeam from './business-team';
import BusinessTeamDetail from './business-team-detail';
import BusinessTeamUpdate from './business-team-update';
import BusinessTeamDeleteDialog from './business-team-delete-dialog';

const BusinessTeamRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BusinessTeam />} />
    <Route path="new" element={<BusinessTeamUpdate />} />
    <Route path=":id">
      <Route index element={<BusinessTeamDetail />} />
      <Route path="edit" element={<BusinessTeamUpdate />} />
      <Route path="delete" element={<BusinessTeamDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BusinessTeamRoutes;
