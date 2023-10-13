import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CountySubCountyCode from './county-sub-county-code';
import CountySubCountyCodeDetail from './county-sub-county-code-detail';
import CountySubCountyCodeUpdate from './county-sub-county-code-update';
import CountySubCountyCodeDeleteDialog from './county-sub-county-code-delete-dialog';

const CountySubCountyCodeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CountySubCountyCode />} />
    <Route path="new" element={<CountySubCountyCodeUpdate />} />
    <Route path=":id">
      <Route index element={<CountySubCountyCodeDetail />} />
      <Route path="edit" element={<CountySubCountyCodeUpdate />} />
      <Route path="delete" element={<CountySubCountyCodeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CountySubCountyCodeRoutes;
