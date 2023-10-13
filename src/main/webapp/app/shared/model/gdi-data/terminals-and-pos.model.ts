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
