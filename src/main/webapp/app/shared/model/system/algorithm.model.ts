import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';

export interface IAlgorithm {
  id?: number;
  name?: string;
  placeholders?: IPlaceholder[] | null;
  parameters?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<IAlgorithm> = {};
