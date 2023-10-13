import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AgentBankingActivity from './agent-banking-activity';
import AgentBankingActivityDetail from './agent-banking-activity-detail';
import AgentBankingActivityUpdate from './agent-banking-activity-update';
import AgentBankingActivityDeleteDialog from './agent-banking-activity-delete-dialog';

const AgentBankingActivityRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AgentBankingActivity />} />
    <Route path="new" element={<AgentBankingActivityUpdate />} />
    <Route path=":id">
      <Route index element={<AgentBankingActivityDetail />} />
      <Route path="edit" element={<AgentBankingActivityUpdate />} />
      <Route path="delete" element={<AgentBankingActivityDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AgentBankingActivityRoutes;
