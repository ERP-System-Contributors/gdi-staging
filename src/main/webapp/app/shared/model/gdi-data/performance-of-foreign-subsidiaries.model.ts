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
import { IIsoCountryCode } from 'app/shared/model/gdi/iso-country-code.model';

export interface IPerformanceOfForeignSubsidiaries {
  id?: number;
  subsidiaryName?: string;
  reportingDate?: string;
  subsidiaryId?: string;
  grossLoansAmount?: number;
  grossNPALoanAmount?: number;
  grossAssetsAmount?: number;
  grossDepositsAmount?: number;
  profitBeforeTax?: number;
  totalCapitalAdequacyRatio?: number;
  liquidityRatio?: number;
  generalProvisions?: number;
  specificProvisions?: number;
  interestInSuspenseAmount?: number;
  totalNumberOfStaff?: number;
  numberOfBranches?: number;
  bankCode?: IInstitutionCode;
  subsidiaryCountryCode?: IIsoCountryCode;
}

export const defaultValue: Readonly<IPerformanceOfForeignSubsidiaries> = {};
