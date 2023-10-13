import dayjs from 'dayjs';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { IAccountOwnershipType } from 'app/shared/model/gdi/account-ownership-type.model';

export interface IAccountAttribute {
  id?: number;
  reportingDate?: string;
  customerNumber?: string;
  accountContractNumber?: string;
  accountName?: string;
  accountOpeningDate?: string | null;
  accountClosingDate?: string | null;
  debitInterestRate?: number;
  creditInterestRate?: number;
  sanctionedAccountLimitFcy?: number;
  sanctionedAccountLimitLcy?: number;
  accountStatusChangeDate?: string | null;
  expiryDate?: string | null;
  bankCode?: IInstitutionCode;
  branchCode?: IBankBranchCode;
  accountOwnershipType?: IAccountOwnershipType;
}

export const defaultValue: Readonly<IAccountAttribute> = {};
