import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IFixedAssetAcquisition {
  id?: number;
  assetNumber?: number | null;
  serviceOutletCode?: string | null;
  assetTag?: string | null;
  assetDescription?: string | null;
  purchaseDate?: string | null;
  assetCategory?: string | null;
  purchasePrice?: number | null;
  fileUploadToken?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IFixedAssetAcquisition> = {};
