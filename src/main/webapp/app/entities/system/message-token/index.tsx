import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import MessageToken from './message-token';
import MessageTokenDetail from './message-token-detail';
import MessageTokenUpdate from './message-token-update';
import MessageTokenDeleteDialog from './message-token-delete-dialog';

const MessageTokenRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<MessageToken />} />
    <Route path="new" element={<MessageTokenUpdate />} />
    <Route path=":id">
      <Route index element={<MessageTokenDetail />} />
      <Route path="edit" element={<MessageTokenUpdate />} />
      <Route path="delete" element={<MessageTokenDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default MessageTokenRoutes;
