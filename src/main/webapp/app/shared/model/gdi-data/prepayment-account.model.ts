import { ISettlementCurrency } from 'app/shared/model/gdi-data/settlement-currency.model';
import { ISettlement } from 'app/shared/model/gdi-data/settlement.model';
import { IServiceOutlet } from 'app/shared/model/gdi-data/service-outlet.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { ITransactionAccount } from 'app/shared/model/gdi-data/transaction-account.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';
import { IPrepaymentMapping } from 'app/shared/model/gdi-data/prepayment-mapping.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';

export interface IPrepaymentAccount {
  id?: number;
  catalogueNumber?: string;
  particulars?: string;
  notes?: string | null;
  prepaymentAmount?: number | null;
  prepaymentGuid?: string | null;
  settlementCurrency?: ISettlementCurrency | null;
  prepaymentTransaction?: ISettlement | null;
  serviceOutlet?: IServiceOutlet | null;
  dealer?: IDealer | null;
  debitAccount?: ITransactionAccount | null;
  transferAccount?: ITransactionAccount | null;
  placeholders?: IPlaceholder[] | null;
  generalParameters?: IUniversallyUniqueMapping[] | null;
  prepaymentParameters?: IPrepaymentMapping[] | null;
  businessDocuments?: IBusinessDocument[] | null;
}

export const defaultValue: Readonly<IPrepaymentAccount> = {};
