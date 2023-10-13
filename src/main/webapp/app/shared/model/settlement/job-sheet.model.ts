import dayjs from 'dayjs';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { IBusinessStamp } from 'app/shared/model/settlement/business-stamp.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';

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
