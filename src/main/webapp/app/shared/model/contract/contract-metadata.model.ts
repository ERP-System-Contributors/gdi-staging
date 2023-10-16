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