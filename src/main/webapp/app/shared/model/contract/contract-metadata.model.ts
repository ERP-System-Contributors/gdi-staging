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
import { IDealer } from 'app/shared/model/people/dealer.model';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { ISecurityClearance } from 'app/shared/model/people/security-clearance.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { ContractType } from 'app/shared/model/enumerations/contract-type.model';
import { ContractStatus } from 'app/shared/model/enumerations/contract-status.model';

export interface IContractMetadata {
  id?: number;
  description?: string | null;
  typeOfContract?: ContractType;
  contractStatus?: ContractStatus;
  startDate?: string;
  terminationDate?: string;
  commentsAndAttachment?: string | null;
  contractTitle?: string;
  contractIdentifier?: string;
  contractIdentifierShort?: string;
  relatedContracts?: IContractMetadata[] | null;
  department?: IDealer | null;
  contractPartner?: IDealer | null;
  responsiblePerson?: IApplicationUser | null;
  signatories?: IApplicationUser[] | null;
  securityClearance?: ISecurityClearance | null;
  placeholders?: IPlaceholder[] | null;
  contractDocumentFiles?: IBusinessDocument[] | null;
  contractMappings?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<IContractMetadata> = {};
