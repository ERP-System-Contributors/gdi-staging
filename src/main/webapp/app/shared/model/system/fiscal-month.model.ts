import dayjs from 'dayjs';
import { IFiscalYear } from 'app/shared/model/system/fiscal-year.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { IFiscalQuarter } from 'app/shared/model/system/fiscal-quarter.model';

export interface IFiscalMonth {
  id?: number;
  monthNumber?: number;
  startDate?: string;
  endDate?: string;
  fiscalMonthCode?: string;
  fiscalYear?: IFiscalYear;
  placeholders?: IPlaceholder[] | null;
  universallyUniqueMappings?: IUniversallyUniqueMapping[] | null;
  fiscalQuarter?: IFiscalQuarter | null;
}

export const defaultValue: Readonly<IFiscalMonth> = {};
