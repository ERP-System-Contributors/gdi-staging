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
import { ICountySubCountyCode } from 'app/shared/model/gdi-data/county-sub-county-code.model';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { IOutletType } from 'app/shared/model/gdi/outlet-type.model';
import { IOutletStatus } from 'app/shared/model/gdi/outlet-status.model';

export interface IParticularsOfOutlet {
  id?: number;
  businessReportingDate?: string;
  outletName?: string;
  town?: string;
  iso6709Latitute?: number;
  iso6709Longitude?: number;
  cbkApprovalDate?: string;
  outletOpeningDate?: string;
  outletClosureDate?: string | null;
  licenseFeePayable?: number;
  subCountyCode?: ICountySubCountyCode;
  bankCode?: IInstitutionCode;
  outletId?: IBankBranchCode;
  typeOfOutlet?: IOutletType;
  outletStatus?: IOutletStatus;
}

export const defaultValue: Readonly<IParticularsOfOutlet> = {};
