import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { FileMediumTypes } from 'app/shared/model/enumerations/file-medium-types.model';
import { FileModelType } from 'app/shared/model/enumerations/file-model-type.model';

export interface IFileType {
  id?: number;
  fileTypeName?: string;
  fileMediumType?: FileMediumTypes;
  description?: string | null;
  fileTemplateContentType?: string | null;
  fileTemplate?: string | null;
  fileType?: FileModelType;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IFileType> = {};
