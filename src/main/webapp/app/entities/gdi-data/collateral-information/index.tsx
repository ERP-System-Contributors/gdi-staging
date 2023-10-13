import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CollateralInformation from './collateral-information';
import CollateralInformationDetail from './collateral-information-detail';
import CollateralInformationUpdate from './collateral-information-update';
import CollateralInformationDeleteDialog from './collateral-information-delete-dialog';

const CollateralInformationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CollateralInformation />} />
    <Route path="new" element={<CollateralInformationUpdate />} />
    <Route path=":id">
      <Route index element={<CollateralInformationDetail />} />
      <Route path="edit" element={<CollateralInformationUpdate />} />
      <Route path="delete" element={<CollateralInformationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CollateralInformationRoutes;
