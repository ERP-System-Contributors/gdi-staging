import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CardFraudInformation from './card-fraud-information';
import CardFraudInformationDetail from './card-fraud-information-detail';
import CardFraudInformationUpdate from './card-fraud-information-update';
import CardFraudInformationDeleteDialog from './card-fraud-information-delete-dialog';

const CardFraudInformationRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CardFraudInformation />} />
    <Route path="new" element={<CardFraudInformationUpdate />} />
    <Route path=":id">
      <Route index element={<CardFraudInformationDetail />} />
      <Route path="edit" element={<CardFraudInformationUpdate />} />
      <Route path="delete" element={<CardFraudInformationDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CardFraudInformationRoutes;
