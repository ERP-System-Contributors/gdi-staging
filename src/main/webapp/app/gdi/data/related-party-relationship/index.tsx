import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import RelatedPartyRelationship from './related-party-relationship';
import RelatedPartyRelationshipDetail from './related-party-relationship-detail';
import RelatedPartyRelationshipUpdate from './related-party-relationship-update';
import RelatedPartyRelationshipDeleteDialog from './related-party-relationship-delete-dialog';

const RelatedPartyRelationshipRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<RelatedPartyRelationship />} />
    <Route path="new" element={<RelatedPartyRelationshipUpdate />} />
    <Route path=":id">
      <Route index element={<RelatedPartyRelationshipDetail />} />
      <Route path="edit" element={<RelatedPartyRelationshipUpdate />} />
      <Route path="delete" element={<RelatedPartyRelationshipDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default RelatedPartyRelationshipRoutes;
