import dayjs from 'dayjs';
import { IServiceOutlet } from 'app/shared/model/gdi-data/service-outlet.model';
import { IAssetCategory } from 'app/shared/model/gdi-data/asset-category.model';
import { IDepreciationMethod } from 'app/shared/model/gdi-data/depreciation-method.model';
import { IAssetRegistration } from 'app/shared/model/gdi-data/asset-registration.model';
import { IDepreciationPeriod } from 'app/shared/model/gdi-data/depreciation-period.model';
import { IFiscalMonth } from 'app/shared/model/gdi-data/fiscal-month.model';
import { IFiscalQuarter } from 'app/shared/model/gdi-data/fiscal-quarter.model';
import { IFiscalYear } from 'app/shared/model/gdi-data/fiscal-year.model';

export interface IDepreciationEntry {
  id?: number;
  postedAt?: string | null;
  depreciationAmount?: number | null;
  assetNumber?: number | null;
  serviceOutlet?: IServiceOutlet | null;
  assetCategory?: IAssetCategory | null;
  depreciationMethod?: IDepreciationMethod | null;
  assetRegistration?: IAssetRegistration | null;
  depreciationPeriod?: IDepreciationPeriod | null;
  fiscalMonth?: IFiscalMonth | null;
  fiscalQuarter?: IFiscalQuarter | null;
  fiscalYear?: IFiscalYear | null;
}

export const defaultValue: Readonly<IDepreciationEntry> = {};
