import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BusinessStamp from './business-stamp';
import BusinessStampDetail from './business-stamp-detail';
import BusinessStampUpdate from './business-stamp-update';
import BusinessStampDeleteDialog from './business-stamp-delete-dialog';

const BusinessStampRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BusinessStamp />} />
    <Route path="new" element={<BusinessStampUpdate />} />
    <Route path=":id">
      <Route index element={<BusinessStampDetail />} />
      <Route path="edit" element={<BusinessStampUpdate />} />
      <Route path="delete" element={<BusinessStampDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BusinessStampRoutes;
