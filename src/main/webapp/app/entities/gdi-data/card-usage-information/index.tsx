import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CardUsageInformation from './card-usage-information';
import CardUsageInformationDetail from './card-usage-information-detail';
import CardUsageInformationUpdate from './card-usage-information-update';
import CardUsageInformationDeleteDialog from './card-usage-information-delete-dialog';

const CardUsageInformationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CardUsageInformation />} />
    <Route path="new" element={<CardUsageInformationUpdate />} />
    <Route path=":id">
      <Route index element={<CardUsageInformationDetail />} />
      <Route path="edit" element={<CardUsageInformationUpdate />} />
      <Route path="delete" element={<CardUsageInformationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CardUsageInformationRoutes;
