import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { taxReferenceTypes } from 'app/shared/model/enumerations/tax-reference-types.model';

export interface ITaxReference {
  id?: number;
  taxName?: string | null;
  taxDescription?: string | null;
  taxPercentage?: number;
  taxReferenceType?: taxReferenceTypes;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<ITaxReference> = {};
