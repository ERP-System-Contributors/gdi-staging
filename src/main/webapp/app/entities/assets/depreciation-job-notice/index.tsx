import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DepreciationJobNotice from './depreciation-job-notice';
import DepreciationJobNoticeDetail from './depreciation-job-notice-detail';
import DepreciationJobNoticeUpdate from './depreciation-job-notice-update';
import DepreciationJobNoticeDeleteDialog from './depreciation-job-notice-delete-dialog';

const DepreciationJobNoticeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DepreciationJobNotice />} />
    <Route path="new" element={<DepreciationJobNoticeUpdate />} />
    <Route path=":id">
      <Route index element={<DepreciationJobNoticeDetail />} />
      <Route path="edit" element={<DepreciationJobNoticeUpdate />} />
      <Route path="delete" element={<DepreciationJobNoticeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DepreciationJobNoticeRoutes;
