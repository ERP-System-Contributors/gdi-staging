import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import DeliveryNote from './delivery-note';
import DeliveryNoteDetail from './delivery-note-detail';
import DeliveryNoteUpdate from './delivery-note-update';
import DeliveryNoteDeleteDialog from './delivery-note-delete-dialog';

const DeliveryNoteRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<DeliveryNote />} />
    <Route path="new" element={<DeliveryNoteUpdate />} />
    <Route path=":id">
      <Route index element={<DeliveryNoteDetail />} />
      <Route path="edit" element={<DeliveryNoteUpdate />} />
      <Route path="delete" element={<DeliveryNoteDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default DeliveryNoteRoutes;
