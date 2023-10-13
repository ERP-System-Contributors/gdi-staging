import dayjs from 'dayjs';
import { IPurchaseOrder } from 'app/shared/model/gdi-data/purchase-order.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IPaymentLabel } from 'app/shared/model/gdi-data/payment-label.model';
import { ISettlementCurrency } from 'app/shared/model/gdi-data/settlement-currency.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { IDeliveryNote } from 'app/shared/model/gdi-data/delivery-note.model';
import { IJobSheet } from 'app/shared/model/gdi-data/job-sheet.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';

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
