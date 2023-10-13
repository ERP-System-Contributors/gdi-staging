import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';

export interface ISecurityClearance {
  id?: number;
  clearanceLevel?: string;
  grantedClearances?: ISecurityClearance[] | null;
  placeholders?: IPlaceholder[] | null;
  systemParameters?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<ISecurityClearance> = {};
