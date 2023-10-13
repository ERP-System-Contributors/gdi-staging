import { IGdiMasterDataIndex } from 'app/shared/model/gdi/gdi-master-data-index.model';
import { MandatoryFieldFlagTypes } from 'app/shared/model/enumerations/mandatory-field-flag-types.model';

export interface IAccountAttributeMetadata {
  id?: number;
  precedence?: number;
  columnName?: string;
  shortName?: string;
  detailedDefinition?: string | null;
  dataType?: string;
  length?: number | null;
  columnIndex?: string | null;
  mandatoryFieldFlag?: MandatoryFieldFlagTypes;
  businessValidation?: string | null;
  technicalValidation?: string | null;
  dbColumnName?: string | null;
  metadataVersion?: number | null;
  standardInputTemplate?: IGdiMasterDataIndex | null;
}

export const defaultValue: Readonly<IAccountAttributeMetadata> = {};
