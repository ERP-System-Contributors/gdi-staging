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
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { ICountySubCountyCode } from 'app/shared/model/gdi-data/county-sub-county-code.model';
import { IKenyanCurrencyDenomination } from 'app/shared/model/gdi/kenyan-currency-denomination.model';

export interface IWeeklyCashHolding {
  id?: number;
  reportingDate?: string;
  fitUnits?: number;
  unfitUnits?: number;
  bankCode?: IInstitutionCode;
  branchId?: IBankBranchCode;
  subCountyCode?: ICountySubCountyCode;
  denomination?: IKenyanCurrencyDenomination;
}

export const defaultValue: Readonly<IWeeklyCashHolding> = {};
