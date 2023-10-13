import { IPaymentLabel } from 'app/shared/model/gdi-data/payment-label.model';
import { IPaymentCategory } from 'app/shared/model/gdi-data/payment-category.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IPaymentCalculation {
  id?: number;
  paymentExpense?: number | null;
  withholdingVAT?: number | null;
  withholdingTax?: number | null;
  paymentAmount?: number | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  paymentCategory?: IPaymentCategory | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IPaymentCalculation> = {};
