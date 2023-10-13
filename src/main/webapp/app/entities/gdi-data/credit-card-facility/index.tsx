import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CreditCardFacility from './credit-card-facility';
import CreditCardFacilityDetail from './credit-card-facility-detail';
import CreditCardFacilityUpdate from './credit-card-facility-update';
import CreditCardFacilityDeleteDialog from './credit-card-facility-delete-dialog';

const CreditCardFacilityRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CreditCardFacility />} />
    <Route path="new" element={<CreditCardFacilityUpdate />} />
    <Route path=":id">
      <Route index element={<CreditCardFacilityDetail />} />
      <Route path="edit" element={<CreditCardFacilityUpdate />} />
      <Route path="delete" element={<CreditCardFacilityDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CreditCardFacilityRoutes;
