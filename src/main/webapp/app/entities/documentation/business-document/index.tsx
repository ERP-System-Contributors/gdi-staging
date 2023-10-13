import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import BusinessDocument from './business-document';
import BusinessDocumentDetail from './business-document-detail';
import BusinessDocumentUpdate from './business-document-update';
import BusinessDocumentDeleteDialog from './business-document-delete-dialog';

const BusinessDocumentRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<BusinessDocument />} />
    <Route path="new" element={<BusinessDocumentUpdate />} />
    <Route path=":id">
      <Route index element={<BusinessDocumentDetail />} />
      <Route path="edit" element={<BusinessDocumentUpdate />} />
      <Route path="delete" element={<BusinessDocumentDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BusinessDocumentRoutes;
