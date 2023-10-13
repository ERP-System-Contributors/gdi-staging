import { IDepreciationMethod } from 'app/shared/model/gdi-data/depreciation-method.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

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
