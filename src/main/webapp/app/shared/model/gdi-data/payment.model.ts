import dayjs from 'dayjs';
import { IPaymentLabel } from 'app/shared/model/gdi-data/payment-label.model';
import { IPaymentCategory } from 'app/shared/model/gdi-data/payment-category.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { CurrencyTypes } from 'app/shared/model/enumerations/currency-types.model';

export interface IPayment {
  id?: number;
  paymentNumber?: string | null;
  paymentDate?: string | null;
  invoicedAmount?: number | null;
  paymentAmount?: number | null;
  description?: string | null;
  settlementCurrency?: CurrencyTypes;
  calculationFileContentType?: string | null;
  calculationFile?: string | null;
  dealerName?: string | null;
  purchaseOrderNumber?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  paymentCategory?: IPaymentCategory | null;
  placeholders?: IPlaceholder[] | null;
  paymentGroup?: IPayment | null;
}

export const defaultValue: Readonly<IPayment> = {};
