import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IPrepaymentMapping {
  id?: number;
  parameterKey?: string;
  parameterGuid?: string;
  parameter?: string;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IPrepaymentMapping> = {};
