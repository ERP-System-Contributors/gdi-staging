import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IFileUpload {
  id?: number;
  description?: string;
  fileName?: string;
  periodFrom?: string | null;
  periodTo?: string | null;
  fileTypeId?: number;
  dataFileContentType?: string;
  dataFile?: string;
  uploadSuccessful?: boolean | null;
  uploadProcessed?: boolean | null;
  uploadToken?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IFileUpload> = {
  uploadSuccessful: false,
  uploadProcessed: false,
};
