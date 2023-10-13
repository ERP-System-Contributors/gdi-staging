import dayjs from 'dayjs';
import { IDepreciationJob } from 'app/shared/model/gdi-data/depreciation-job.model';
import { IDepreciationBatchSequence } from 'app/shared/model/gdi-data/depreciation-batch-sequence.model';
import { IDepreciationPeriod } from 'app/shared/model/gdi-data/depreciation-period.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';
import { IApplicationUser } from 'app/shared/model/gdi-data/application-user.model';
import { DepreciationNoticeStatusType } from 'app/shared/model/enumerations/depreciation-notice-status-type.model';

export interface IDepreciationJobNotice {
  id?: number;
  eventNarrative?: string;
  eventTimeStamp?: string;
  depreciationNoticeStatus?: DepreciationNoticeStatusType;
  sourceModule?: string | null;
  sourceEntity?: string | null;
  errorCode?: string | null;
  errorMessage?: string | null;
  userAction?: string | null;
  technicalDetails?: string | null;
  depreciationJob?: IDepreciationJob | null;
  depreciationBatchSequence?: IDepreciationBatchSequence | null;
  depreciationPeriod?: IDepreciationPeriod | null;
  placeholders?: IPlaceholder[] | null;
  universallyUniqueMappings?: IUniversallyUniqueMapping[] | null;
  superintended?: IApplicationUser | null;
}

export const defaultValue: Readonly<IDepreciationJobNotice> = {};
