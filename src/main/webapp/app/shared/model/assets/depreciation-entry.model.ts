import dayjs from 'dayjs';
import { IServiceOutlet } from 'app/shared/model/gdi/service-outlet.model';
import { IAssetCategory } from 'app/shared/model/assets/asset-category.model';
import { IDepreciationMethod } from 'app/shared/model/assets/depreciation-method.model';
import { IAssetRegistration } from 'app/shared/model/assets/asset-registration.model';
import { IDepreciationPeriod } from 'app/shared/model/assets/depreciation-period.model';
import { IFiscalMonth } from 'app/shared/model/system/fiscal-month.model';
import { IFiscalQuarter } from 'app/shared/model/system/fiscal-quarter.model';
import { IFiscalYear } from 'app/shared/model/system/fiscal-year.model';

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
