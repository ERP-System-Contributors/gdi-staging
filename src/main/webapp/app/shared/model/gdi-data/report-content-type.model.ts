import { ISystemContentType } from 'app/shared/model/gdi-data/system-content-type.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IReportContentType {
  id?: number;
  reportTypeName?: string;
  reportFileExtension?: string;
  systemContentType?: ISystemContentType;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IReportContentType> = {};
