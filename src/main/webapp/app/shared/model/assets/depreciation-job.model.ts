import dayjs from 'dayjs';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { IDepreciationPeriod } from 'app/shared/model/assets/depreciation-period.model';
import { DepreciationJobStatusType } from 'app/shared/model/enumerations/depreciation-job-status-type.model';

export interface IDepreciationJob {
  id?: number;
  timeOfCommencement?: string | null;
  depreciationJobStatus?: DepreciationJobStatusType | null;
  description?: string | null;
  createdBy?: IApplicationUser | null;
  depreciationPeriod?: IDepreciationPeriod | null;
}

export const defaultValue: Readonly<IDepreciationJob> = {};
