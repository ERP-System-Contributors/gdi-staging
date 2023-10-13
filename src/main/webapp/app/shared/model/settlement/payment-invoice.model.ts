import dayjs from 'dayjs';
import { IPurchaseOrder } from 'app/shared/model/settlement/purchase-order.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { IDeliveryNote } from 'app/shared/model/settlement/delivery-note.model';
import { IJobSheet } from 'app/shared/model/settlement/job-sheet.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';

export interface IPaymentInvoice {
  id?: number;
  invoiceNumber?: string;
  invoiceDate?: string | null;
  invoiceAmount?: number | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  purchaseOrders?: IPurchaseOrder[] | null;
  placeholders?: IPlaceholder[] | null;
  paymentLabels?: IPaymentLabel[] | null;
  settlementCurrency?: ISettlementCurrency;
  biller?: IDealer;
  deliveryNotes?: IDeliveryNote[] | null;
  jobSheets?: IJobSheet[] | null;
  businessDocuments?: IBusinessDocument[] | null;
}

export const defaultValue: Readonly<IPaymentInvoice> = {};
