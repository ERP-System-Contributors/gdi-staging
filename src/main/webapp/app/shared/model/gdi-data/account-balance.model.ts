import dayjs from 'dayjs';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { IIsoCurrencyCode } from 'app/shared/model/gdi/iso-currency-code.model';

export interface IAccountBalance {
  id?: number;
  reportingDate?: string;
  customerId?: string;
  accountContractNumber?: string;
  accruedInterestBalanceFCY?: number;
  accruedInterestBalanceLCY?: number;
  accountBalanceFCY?: number;
  accountBalanceLCY?: number;
  bankCode?: IInstitutionCode;
  branchId?: IBankBranchCode;
  currencyCode?: IIsoCurrencyCode;
}

export const defaultValue: Readonly<IAccountBalance> = {};
