import { IPaymentLabel } from 'app/shared/model/gdi-data/payment-label.model';
import { IPaymentCalculation } from 'app/shared/model/gdi-data/payment-calculation.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { CategoryTypes } from 'app/shared/model/enumerations/category-types.model';

export interface IPaymentCategory {
  id?: number;
  categoryName?: string;
  categoryDescription?: string | null;
  categoryType?: CategoryTypes;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  paymentCalculations?: IPaymentCalculation[] | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IPaymentCategory> = {};
