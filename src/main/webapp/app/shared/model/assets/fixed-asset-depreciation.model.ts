import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { DepreciationRegime } from 'app/shared/model/enumerations/depreciation-regime.model';

export interface IFixedAssetDepreciation {
  id?: number;
  assetNumber?: number | null;
  serviceOutletCode?: string | null;
  assetTag?: string | null;
  assetDescription?: string | null;
  depreciationDate?: string | null;
  assetCategory?: string | null;
  depreciationAmount?: number | null;
  depreciationRegime?: DepreciationRegime | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IFixedAssetDepreciation> = {};
