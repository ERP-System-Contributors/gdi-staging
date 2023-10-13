import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import FileUpload from './file-upload';
import FileUploadDetail from './file-upload-detail';
import FileUploadUpdate from './file-upload-update';
import FileUploadDeleteDialog from './file-upload-delete-dialog';

const FileUploadRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<FileUpload />} />
    <Route path="new" element={<FileUploadUpdate />} />
    <Route path=":id">
      <Route index element={<FileUploadDetail />} />
      <Route path="edit" element={<FileUploadUpdate />} />
      <Route path="delete" element={<FileUploadDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default FileUploadRoutes;
