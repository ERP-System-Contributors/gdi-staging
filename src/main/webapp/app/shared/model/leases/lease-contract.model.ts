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
