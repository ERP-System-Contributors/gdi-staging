import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { DepreciationTypes } from 'app/shared/model/enumerations/depreciation-types.model';

export interface IDepreciationMethod {
  id?: number;
  depreciationMethodName?: string;
  description?: string | null;
  depreciationType?: DepreciationTypes;
  remarks?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IDepreciationMethod> = {};
