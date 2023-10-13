import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CardIssuerCharges from './card-issuer-charges';
import CardIssuerChargesDetail from './card-issuer-charges-detail';
import CardIssuerChargesUpdate from './card-issuer-charges-update';
import CardIssuerChargesDeleteDialog from './card-issuer-charges-delete-dialog';

const CardIssuerChargesRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CardIssuerCharges />} />
    <Route path="new" element={<CardIssuerChargesUpdate />} />
    <Route path=":id">
      <Route index element={<CardIssuerChargesDetail />} />
      <Route path="edit" element={<CardIssuerChargesUpdate />} />
      <Route path="delete" element={<CardIssuerChargesDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CardIssuerChargesRoutes;
