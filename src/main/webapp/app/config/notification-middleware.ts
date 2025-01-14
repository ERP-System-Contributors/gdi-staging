///
/// GDI Staging - Mark VI No 1 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { toast } from 'react-toastify';
import { isFulfilledAction, isRejectedAction } from 'app/shared/reducers/reducer.utils';

const addErrorAlert = (message, key?, data?) => {
  toast.error(message);
};

export default () => next => action => {
  const { error, payload } = action;

  /**
   *
   * The notification middleware serves to add success and error notifications
   */
  if (isFulfilledAction(action) && payload && payload.headers) {
    const headers = payload?.headers;
    let alert: string | null = null;
    headers &&
      Object.entries<string>(headers).forEach(([k, v]) => {
        if (k.toLowerCase().endsWith('app-alert')) {
          alert = v;
        }
      });
    if (alert) {
      toast.success(alert);
    }
  }

  if (isRejectedAction(action) && error && error.isAxiosError) {
    if (error.response) {
      const response = error.response;
      const data = response.data;
      if (
        !(
          response.status === 401 &&
          (error.message === '' || (data && data.path && (data.path.includes('/api/account') || data.path.includes('/api/authenticate'))))
        )
      ) {
        switch (response.status) {
          // connection refused, server not reachable
          case 0:
            addErrorAlert('Server not reachable', 'error.server.not.reachable');
            break;

          case 400: {
            let errorHeader: string | null = null;
            let entityKey: string | null = null;
            response?.headers &&
              Object.entries<string>(response.headers).forEach(([k, v]) => {
                if (k.toLowerCase().endsWith('app-error')) {
                  errorHeader = v;
                } else if (k.toLowerCase().endsWith('app-params')) {
                  entityKey = v;
                }
              });
            if (errorHeader) {
              const entityName = entityKey;
              addErrorAlert(errorHeader, errorHeader, { entityName });
            } else if (data?.fieldErrors) {
              const fieldErrors = data.fieldErrors;
              for (const fieldError of fieldErrors) {
                if (['Min', 'Max', 'DecimalMin', 'DecimalMax'].includes(fieldError.message)) {
                  fieldError.message = 'Size';
                }
                // convert 'something[14].other[4].id' to 'something[].other[].id' so translations can be written to it
                const convertedField = fieldError.field.replace(/\[\d*\]/g, '[]');
                const fieldName = convertedField.charAt(0).toUpperCase() + convertedField.slice(1);
                addErrorAlert(`Error on field "${fieldName}"`, `error.${fieldError.message}`, { fieldName });
              }
            } else if (typeof data === 'string' && data !== '') {
              addErrorAlert(data);
            } else {
              toast.error(data?.message || data?.error || data?.title || 'Unknown error!');
            }
            break;
          }
          case 404:
            addErrorAlert('Not found', 'error.url.not.found');
            break;

          default:
            if (typeof data === 'string' && data !== '') {
              addErrorAlert(data);
            } else {
              toast.error(data?.message || data?.error || data?.title || 'Unknown error!');
            }
        }
      }
    } else if (error.config && error.config.url === 'api/account' && error.config.method === 'get') {
      /* eslint-disable no-console */
      console.log('Authentication Error: Trying to access url api/account with GET.');
    } else {
      toast.error(error.message || 'Unknown error!');
    }
  } else if (error) {
    toast.error(error.message || 'Unknown error!');
  }

  return next(action);
};
