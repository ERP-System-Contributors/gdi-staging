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
import { ITerminalTypes } from 'app/shared/model/gdi/terminal-types.model';
import { ITerminalFunctions } from 'app/shared/model/gdi/terminal-functions.model';
import { ICountySubCountyCode } from 'app/shared/model/gdi-data/county-sub-county-code.model';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';

export interface ITerminalsAndPOS {
  id?: number;
  reportingDate?: string;
  terminalId?: string;
  merchantId?: string;
  terminalName?: string;
  terminalLocation?: string;
  iso6709Latitute?: number;
  iso6709Longitude?: number;
  terminalOpeningDate?: string;
  terminalClosureDate?: string | null;
  terminalType?: ITerminalTypes;
  terminalFunctionality?: ITerminalFunctions;
  physicalLocation?: ICountySubCountyCode;
  bankId?: IInstitutionCode;
  branchId?: IBankBranchCode;
}

export const defaultValue: Readonly<ITerminalsAndPOS> = {};
