import dayjs from 'dayjs';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { IBusinessStamp } from 'app/shared/model/gdi-data/business-stamp.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IPaymentLabel } from 'app/shared/model/gdi-data/payment-label.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';

export interface IJobSheet {
  id?: number;
  serialNumber?: string;
  jobSheetDate?: string | null;
  details?: string | null;
  remarks?: string | null;
  biller?: IDealer;
  signatories?: IDealer[] | null;
  contactPerson?: IDealer | null;
  businessStamps?: IBusinessStamp[] | null;
  placeholders?: IPlaceholder[] | null;
  paymentLabels?: IPaymentLabel[] | null;
  businessDocuments?: IBusinessDocument[] | null;
}

export const defaultValue: Readonly<IJobSheet> = {};
