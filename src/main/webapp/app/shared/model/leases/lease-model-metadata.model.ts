import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { ILeaseContract } from 'app/shared/model/leases/lease-contract.model';
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { ISecurityClearance } from 'app/shared/model/people/security-clearance.model';
import { ITransactionAccount } from 'app/shared/model/accounting/transaction-account.model';

export interface ILeaseModelMetadata {
  id?: number;
  modelTitle?: string;
  modelVersion?: number;
  description?: string | null;
  modelNotesContentType?: string | null;
  modelNotes?: string | null;
  annualDiscountingRate?: number;
  commencementDate?: string;
  terminalDate?: string;
  totalReportingPeriods?: number | null;
  reportingPeriodsPerYear?: number | null;
  settlementPeriodsPerYear?: number | null;
  initialLiabilityAmount?: number | null;
  initialROUAmount?: number | null;
  totalDepreciationPeriods?: number | null;
  placeholders?: IPlaceholder[] | null;
  leaseMappings?: IUniversallyUniqueMapping[] | null;
  leaseContract?: ILeaseContract;
  predecessor?: ILeaseModelMetadata | null;
  liabilityCurrency?: ISettlementCurrency;
  rouAssetCurrency?: ISettlementCurrency;
  modelAttachments?: IBusinessDocument | null;
  securityClearance?: ISecurityClearance | null;
  leaseLiabilityAccount?: ITransactionAccount | null;
  interestPayableAccount?: ITransactionAccount | null;
  interestExpenseAccount?: ITransactionAccount | null;
  rouAssetAccount?: ITransactionAccount | null;
  rouDepreciationAccount?: ITransactionAccount | null;
  accruedDepreciationAccount?: ITransactionAccount | null;
}

export const defaultValue: Readonly<ILeaseModelMetadata> = {};
