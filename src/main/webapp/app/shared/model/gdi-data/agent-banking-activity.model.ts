import dayjs from 'dayjs';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { IBankTransactionType } from 'app/shared/model/gdi/bank-transaction-type.model';

export interface IAgentBankingActivity {
  id?: number;
  reportingDate?: string;
  agentUniqueId?: string;
  terminalUniqueId?: string;
  totalCountOfTransactions?: number;
  totalValueOfTransactionsInLCY?: number;
  bankCode?: IInstitutionCode;
  branchCode?: IBankBranchCode;
  transactionType?: IBankTransactionType;
}

export const defaultValue: Readonly<IAgentBankingActivity> = {};
