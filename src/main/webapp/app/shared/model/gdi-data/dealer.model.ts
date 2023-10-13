import { IPaymentLabel } from 'app/shared/model/gdi-data/payment-label.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IDealer {
  id?: number;
  dealerName?: string;
  taxNumber?: string | null;
  identificationDocumentNumber?: string | null;
  organizationName?: string | null;
  department?: string | null;
  position?: string | null;
  postalAddress?: string | null;
  physicalAddress?: string | null;
  accountName?: string | null;
  accountNumber?: string | null;
  bankersName?: string | null;
  bankersBranch?: string | null;
  bankersSwiftCode?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  otherNames?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  dealerGroup?: IDealer | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IDealer> = {};
