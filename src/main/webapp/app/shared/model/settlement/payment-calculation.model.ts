import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { IPaymentCategory } from 'app/shared/model/settlement/payment-category.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';

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
