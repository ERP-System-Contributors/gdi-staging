import dayjs from 'dayjs';
import { IPaymentLabel } from 'app/shared/model/gdi-data/payment-label.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { CurrencyTypes } from 'app/shared/model/enumerations/currency-types.model';

export interface IInvoice {
  id?: number;
  invoiceNumber?: string;
  invoiceDate?: string | null;
  invoiceAmount?: number | null;
  currency?: CurrencyTypes;
  paymentReference?: string | null;
  dealerName?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IInvoice> = {};
