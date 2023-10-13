import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import QuestionBase from './question-base';
import QuestionBaseDetail from './question-base-detail';
import QuestionBaseUpdate from './question-base-update';
import QuestionBaseDeleteDialog from './question-base-delete-dialog';

const QuestionBaseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<QuestionBase />} />
    <Route path="new" element={<QuestionBaseUpdate />} />
    <Route path=":id">
      <Route index element={<QuestionBaseDetail />} />
      <Route path="edit" element={<QuestionBaseUpdate />} />
      <Route path="delete" element={<QuestionBaseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default QuestionBaseRoutes;
