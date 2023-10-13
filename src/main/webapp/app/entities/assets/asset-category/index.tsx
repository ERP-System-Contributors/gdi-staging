import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import AssetCategory from './asset-category';
import AssetCategoryDetail from './asset-category-detail';
import AssetCategoryUpdate from './asset-category-update';
import AssetCategoryDeleteDialog from './asset-category-delete-dialog';

const AssetCategoryRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<AssetCategory />} />
    <Route path="new" element={<AssetCategoryUpdate />} />
    <Route path=":id">
      <Route index element={<AssetCategoryDetail />} />
      <Route path="edit" element={<AssetCategoryUpdate />} />
      <Route path="delete" element={<AssetCategoryDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default AssetCategoryRoutes;
