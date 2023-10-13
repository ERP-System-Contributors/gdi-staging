import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import CreditNote from './credit-note';
import CreditNoteDetail from './credit-note-detail';
import CreditNoteUpdate from './credit-note-update';
import CreditNoteDeleteDialog from './credit-note-delete-dialog';

const CreditNoteRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<CreditNote />} />
    <Route path="new" element={<CreditNoteUpdate />} />
    <Route path=":id">
      <Route index element={<CreditNoteDetail />} />
      <Route path="edit" element={<CreditNoteUpdate />} />
      <Route path="delete" element={<CreditNoteDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default CreditNoteRoutes;
