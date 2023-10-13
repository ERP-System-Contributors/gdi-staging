import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TaxReference from './tax-reference';
import TaxReferenceDetail from './tax-reference-detail';
import TaxReferenceUpdate from './tax-reference-update';
import TaxReferenceDeleteDialog from './tax-reference-delete-dialog';

const TaxReferenceRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TaxReference />} />
    <Route path="new" element={<TaxReferenceUpdate />} />
    <Route path=":id">
      <Route index element={<TaxReferenceDetail />} />
      <Route path="edit" element={<TaxReferenceUpdate />} />
      <Route path="delete" element={<TaxReferenceDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TaxReferenceRoutes;
