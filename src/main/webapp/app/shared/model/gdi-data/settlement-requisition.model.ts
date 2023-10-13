import dayjs from 'dayjs';
import { ISettlementCurrency } from 'app/shared/model/gdi-data/settlement-currency.model';
import { IApplicationUser } from 'app/shared/model/gdi-data/application-user.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { IPaymentInvoice } from 'app/shared/model/gdi-data/payment-invoice.model';
import { IDeliveryNote } from 'app/shared/model/gdi-data/delivery-note.model';
import { IJobSheet } from 'app/shared/model/gdi-data/job-sheet.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { ISettlement } from 'app/shared/model/gdi-data/settlement.model';
import { PaymentStatus } from 'app/shared/model/enumerations/payment-status.model';

export interface ISettlementRequisition {
  id?: number;
  description?: string | null;
  serialNumber?: string;
  timeOfRequisition?: string;
  requisitionNumber?: string;
  paymentAmount?: number;
  paymentStatus?: PaymentStatus;
  transactionId?: string | null;
  transactionDate?: string | null;
  settlementCurrency?: ISettlementCurrency;
  currentOwner?: IApplicationUser;
  nativeOwner?: IApplicationUser;
  nativeDepartment?: IDealer;
  biller?: IDealer;
  paymentInvoices?: IPaymentInvoice[] | null;
  deliveryNotes?: IDeliveryNote[] | null;
  jobSheets?: IJobSheet[] | null;
  signatures?: IDealer[] | null;
  businessDocuments?: IBusinessDocument[] | null;
  applicationMappings?: IUniversallyUniqueMapping[] | null;
  placeholders?: IPlaceholder[] | null;
  settlements?: ISettlement[] | null;
}

export const defaultValue: Readonly<ISettlementRequisition> = {};
