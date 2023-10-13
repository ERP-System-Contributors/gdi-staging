import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import StringQuestionBase from './string-question-base';
import StringQuestionBaseDetail from './string-question-base-detail';
import StringQuestionBaseUpdate from './string-question-base-update';
import StringQuestionBaseDeleteDialog from './string-question-base-delete-dialog';

const StringQuestionBaseRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<StringQuestionBase />} />
    <Route path="new" element={<StringQuestionBaseUpdate />} />
    <Route path=":id">
      <Route index element={<StringQuestionBaseDetail />} />
      <Route path="edit" element={<StringQuestionBaseUpdate />} />
      <Route path="delete" element={<StringQuestionBaseDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default StringQuestionBaseRoutes;
