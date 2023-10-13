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
