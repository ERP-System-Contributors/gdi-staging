import { IDepreciationMethod } from 'app/shared/model/assets/depreciation-method.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';

export interface IAssetCategory {
  id?: number;
  assetCategoryName?: string;
  description?: string | null;
  notes?: string | null;
  remarks?: string | null;
  depreciationRateYearly?: number | null;
  depreciationMethod?: IDepreciationMethod;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IAssetCategory> = {};
