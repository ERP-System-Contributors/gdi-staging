import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import FileType from './file-type';
import FileTypeDetail from './file-type-detail';
import FileTypeUpdate from './file-type-update';
import FileTypeDeleteDialog from './file-type-delete-dialog';

const FileTypeRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<FileType />} />
    <Route path="new" element={<FileTypeUpdate />} />
    <Route path=":id">
      <Route index element={<FileTypeDetail />} />
      <Route path="edit" element={<FileTypeUpdate />} />
      <Route path="delete" element={<FileTypeDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FileTypeRoutes;
