import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ReportDesign from './report-design';
import ReportDesignDetail from './report-design-detail';
import ReportDesignUpdate from './report-design-update';
import ReportDesignDeleteDialog from './report-design-delete-dialog';

const ReportDesignRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ReportDesign />} />
    <Route path="new" element={<ReportDesignUpdate />} />
    <Route path=":id">
      <Route index element={<ReportDesignDetail />} />
      <Route path="edit" element={<ReportDesignUpdate />} />
      <Route path="delete" element={<ReportDesignDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ReportDesignRoutes;
