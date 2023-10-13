import dayjs from 'dayjs';
import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';

export interface IPaymentRequisition {
  id?: number;
  receptionDate?: string | null;
  dealerName?: string | null;
  briefDescription?: string | null;
  requisitionNumber?: string | null;
  invoicedAmount?: number | null;
  disbursementCost?: number | null;
  taxableAmount?: number | null;
  requisitionProcessed?: boolean | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IPaymentRequisition> = {
  requisitionProcessed: false,
};
