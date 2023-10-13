import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IProcessStatus } from 'app/shared/model/gdi-data/process-status.model';

export interface IReportStatus {
  id?: number;
  reportName?: string | null;
  reportId?: string | null;
  placeholders?: IPlaceholder[] | null;
  processStatus?: IProcessStatus | null;
}

export const defaultValue: Readonly<IReportStatus> = {};
