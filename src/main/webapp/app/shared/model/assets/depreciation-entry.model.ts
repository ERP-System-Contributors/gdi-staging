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
