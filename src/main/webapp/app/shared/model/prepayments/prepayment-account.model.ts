import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { ISettlement } from 'app/shared/model/settlement/settlement.model';
import { IServiceOutlet } from 'app/shared/model/gdi/service-outlet.model';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { ITransactionAccount } from 'app/shared/model/accounting/transaction-account.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { IPrepaymentMapping } from 'app/shared/model/prepayments/prepayment-mapping.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';

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
