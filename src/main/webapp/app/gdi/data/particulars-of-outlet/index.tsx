import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import ParticularsOfOutlet from './particulars-of-outlet';
import ParticularsOfOutletDetail from './particulars-of-outlet-detail';
import ParticularsOfOutletUpdate from './particulars-of-outlet-update';
import ParticularsOfOutletDeleteDialog from './particulars-of-outlet-delete-dialog';

const ParticularsOfOutletRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<ParticularsOfOutlet />} />
    <Route path="new" element={<ParticularsOfOutletUpdate />} />
    <Route path=":id">
      <Route index element={<ParticularsOfOutletDetail />} />
      <Route path="edit" element={<ParticularsOfOutletUpdate />} />
      <Route path="delete" element={<ParticularsOfOutletDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default ParticularsOfOutletRoutes;
