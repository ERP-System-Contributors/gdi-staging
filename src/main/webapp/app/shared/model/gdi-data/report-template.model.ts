import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IReportTemplate {
  id?: number;
  catalogueNumber?: string;
  description?: string | null;
  notesContentType?: string | null;
  notes?: string | null;
  reportFileContentType?: string | null;
  reportFile?: string | null;
  compileReportFileContentType?: string | null;
  compileReportFile?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IReportTemplate> = {};
