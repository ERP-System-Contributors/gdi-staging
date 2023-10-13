import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';

export interface ISystemModule {
  id?: number;
  moduleName?: string;
  placeholders?: IPlaceholder[] | null;
  applicationMappings?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<ISystemModule> = {};
