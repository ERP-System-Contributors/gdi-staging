import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Placeholder from './placeholder';
import UniversallyUniqueMapping from './universally-unique-mapping';
import GdiMasterDataIndex from './gdi-master-data-index';
import GdiTransactionDataIndex from './gdi-transaction-data-index';
import BusinessTeam from './business-team';
import BusinessDocument from './business-document';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="placeholder/*" element={<Placeholder />} />
        <Route path="gdi-master-data-index/*" element={<GdiMasterDataIndex />} />
        <Route path="gdi-transaction-data-index/*" element={<GdiTransactionDataIndex />} />
        <Route path="universally-unique-mapping/*" element={<UniversallyUniqueMapping />} />
        <Route path="business-team/*" element={<BusinessTeam />} />
        <Route path="business-document/*" element={<BusinessDocument />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
