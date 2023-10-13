import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IProcessStatus } from 'app/shared/model/system/process-status.model';

export interface IReportStatus {
  id?: number;
  reportName?: string;
  reportId?: string;
  placeholders?: IPlaceholder[] | null;
  processStatus?: IProcessStatus | null;
}

export const defaultValue: Readonly<IReportStatus> = {};
