import dayjs from 'dayjs';
import { IDepreciationJob } from 'app/shared/model/gdi-data/depreciation-job.model';
import { DepreciationBatchStatusType } from 'app/shared/model/enumerations/depreciation-batch-status-type.model';

export interface IDepreciationBatchSequence {
  id?: number;
  startIndex?: number | null;
  endIndex?: number | null;
  createdAt?: string | null;
  depreciationBatchStatus?: DepreciationBatchStatusType | null;
  depreciationJob?: IDepreciationJob | null;
}

export const defaultValue: Readonly<IDepreciationBatchSequence> = {};
