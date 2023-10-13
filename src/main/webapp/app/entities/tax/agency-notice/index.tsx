import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AgencyNotice from './agency-notice';
import AgencyNoticeDetail from './agency-notice-detail';
import AgencyNoticeUpdate from './agency-notice-update';
import AgencyNoticeDeleteDialog from './agency-notice-delete-dialog';

const AgencyNoticeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AgencyNotice />} />
    <Route path="new" element={<AgencyNoticeUpdate />} />
    <Route path=":id">
      <Route index element={<AgencyNoticeDetail />} />
      <Route path="edit" element={<AgencyNoticeUpdate />} />
      <Route path="delete" element={<AgencyNoticeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AgencyNoticeRoutes;
