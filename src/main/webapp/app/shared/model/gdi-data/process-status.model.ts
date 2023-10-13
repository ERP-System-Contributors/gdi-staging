import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';

export interface IProcessStatus {
  id?: number;
  statusCode?: string;
  description?: string;
  placeholders?: IPlaceholder[] | null;
  parameters?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<IProcessStatus> = {};
