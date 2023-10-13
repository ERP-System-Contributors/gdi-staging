import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import PrepaymentMarshalling from './prepayment-marshalling';
import PrepaymentMarshallingDetail from './prepayment-marshalling-detail';
import PrepaymentMarshallingUpdate from './prepayment-marshalling-update';
import PrepaymentMarshallingDeleteDialog from './prepayment-marshalling-delete-dialog';

const PrepaymentMarshallingRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<PrepaymentMarshalling />} />
    <Route path="new" element={<PrepaymentMarshallingUpdate />} />
    <Route path=":id">
      <Route index element={<PrepaymentMarshallingDetail />} />
      <Route path="edit" element={<PrepaymentMarshallingUpdate />} />
      <Route path="delete" element={<PrepaymentMarshallingDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PrepaymentMarshallingRoutes;
