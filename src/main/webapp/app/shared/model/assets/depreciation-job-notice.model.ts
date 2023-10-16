///
/// GDI Staging - Mark VI No 1 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import dayjs from 'dayjs';
import { IDepreciationJob } from 'app/shared/model/assets/depreciation-job.model';
import { IDepreciationBatchSequence } from 'app/shared/model/assets/depreciation-batch-sequence.model';
import { IDepreciationPeriod } from 'app/shared/model/assets/depreciation-period.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
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
