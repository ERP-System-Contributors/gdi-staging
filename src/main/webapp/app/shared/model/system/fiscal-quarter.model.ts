import dayjs from 'dayjs';
import { IFiscalYear } from 'app/shared/model/system/fiscal-year.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';

export interface IFiscalQuarter {
  id?: number;
  quarterNumber?: number;
  startDate?: string;
  endDate?: string;
  fiscalQuarterCode?: string;
  fiscalYear?: IFiscalYear;
  placeholders?: IPlaceholder[] | null;
  universallyUniqueMappings?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<IFiscalQuarter> = {};
