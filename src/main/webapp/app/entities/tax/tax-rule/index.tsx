import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import TaxRule from './tax-rule';
import TaxRuleDetail from './tax-rule-detail';
import TaxRuleUpdate from './tax-rule-update';
import TaxRuleDeleteDialog from './tax-rule-delete-dialog';

const TaxRuleRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<TaxRule />} />
    <Route path="new" element={<TaxRuleUpdate />} />
    <Route path=":id">
      <Route index element={<TaxRuleDetail />} />
      <Route path="edit" element={<TaxRuleUpdate />} />
      <Route path="delete" element={<TaxRuleDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default TaxRuleRoutes;
