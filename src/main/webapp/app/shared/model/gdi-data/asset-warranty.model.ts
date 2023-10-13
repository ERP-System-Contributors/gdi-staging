import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';

export interface IAssetWarranty {
  id?: number;
  assetTag?: string | null;
  description?: string | null;
  modelNumber?: string | null;
  serialNumber?: string | null;
  expiryDate?: string | null;
  placeholders?: IPlaceholder[] | null;
  universallyUniqueMappings?: IUniversallyUniqueMapping[] | null;
  dealer?: IDealer;
  warrantyAttachments?: IBusinessDocument[] | null;
}

export const defaultValue: Readonly<IAssetWarranty> = {};
