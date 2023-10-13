import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { IApplicationUser } from 'app/shared/model/people/application-user.model';
import { FiscalYearStatusType } from 'app/shared/model/enumerations/fiscal-year-status-type.model';

export interface IFiscalYear {
  id?: number;
  fiscalYearCode?: string;
  startDate?: string;
  endDate?: string;
  fiscalYearStatus?: FiscalYearStatusType | null;
  placeholders?: IPlaceholder[] | null;
  universallyUniqueMappings?: IUniversallyUniqueMapping[] | null;
  createdBy?: IApplicationUser | null;
  lastUpdatedBy?: IApplicationUser | null;
}

export const defaultValue: Readonly<IFiscalYear> = {};
