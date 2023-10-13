import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IUniversallyUniqueMapping {
  id?: number;
  universalKey?: string;
  mappedValue?: string | null;
  parentMapping?: IUniversallyUniqueMapping | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IUniversallyUniqueMapping> = {};
