import dayjs from 'dayjs';
import { IPrepaymentAccount } from 'app/shared/model/gdi-data/prepayment-account.model';
import { ISettlementCurrency } from 'app/shared/model/gdi-data/settlement-currency.model';
import { ITransactionAccount } from 'app/shared/model/gdi-data/transaction-account.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IPrepaymentAmortization {
  id?: number;
  description?: string | null;
  prepaymentPeriod?: string | null;
  prepaymentAmount?: number | null;
  inactive?: boolean | null;
  prepaymentAccount?: IPrepaymentAccount | null;
  settlementCurrency?: ISettlementCurrency | null;
  debitAccount?: ITransactionAccount | null;
  creditAccount?: ITransactionAccount | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IPrepaymentAmortization> = {
  inactive: false,
};
