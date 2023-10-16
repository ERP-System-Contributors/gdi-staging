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

import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { IContractMetadata } from 'app/shared/model/contract/contract-metadata.model';

export interface ILeaseContract {
  id?: number;
  bookingId?: string;
  leaseTitle?: string;
  identifier?: string;
  description?: string | null;
  commencementDate?: string;
  terminalDate?: string;
  placeholders?: IPlaceholder[] | null;
  systemMappings?: IUniversallyUniqueMapping[] | null;
  businessDocuments?: IBusinessDocument[] | null;
  contractMetadata?: IContractMetadata[] | null;
}

export const defaultValue: Readonly<ILeaseContract> = {};
