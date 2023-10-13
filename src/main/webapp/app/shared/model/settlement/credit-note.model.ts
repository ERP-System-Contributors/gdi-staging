import dayjs from 'dayjs';
import { IPurchaseOrder } from 'app/shared/model/settlement/purchase-order.model';
import { IPaymentInvoice } from 'app/shared/model/settlement/payment-invoice.model';
import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';

export interface ICreditNote {
  id?: number;
  creditNumber?: string;
  creditNoteDate?: string;
  creditAmount?: number;
  remarks?: string | null;
  purchaseOrders?: IPurchaseOrder[] | null;
  invoices?: IPaymentInvoice[] | null;
  paymentLabels?: IPaymentLabel[] | null;
  placeholders?: IPlaceholder[] | null;
  settlementCurrency?: ISettlementCurrency | null;
}

export const defaultValue: Readonly<ICreditNote> = {};
