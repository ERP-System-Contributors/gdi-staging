import dayjs from 'dayjs';
import { IApplicationUser } from 'app/shared/model/gdi-data/application-user.model';
import { IFiscalYear } from 'app/shared/model/gdi-data/fiscal-year.model';
import { IFiscalMonth } from 'app/shared/model/gdi-data/fiscal-month.model';
import { IFiscalQuarter } from 'app/shared/model/gdi-data/fiscal-quarter.model';
import { DepreciationPeriodStatusTypes } from 'app/shared/model/enumerations/depreciation-period-status-types.model';

export interface IDepreciationPeriod {
  id?: number;
  startDate?: string;
  endDate?: string;
  depreciationPeriodStatus?: DepreciationPeriodStatusTypes | null;
  periodCode?: string;
  processLocked?: boolean | null;
  previousPeriod?: IDepreciationPeriod | null;
  createdBy?: IApplicationUser | null;
  fiscalYear?: IFiscalYear;
  fiscalMonth?: IFiscalMonth;
  fiscalQuarter?: IFiscalQuarter;
}

export const defaultValue: Readonly<IDepreciationPeriod> = {
  processLocked: false,
};
