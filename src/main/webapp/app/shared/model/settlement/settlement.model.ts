import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { IPaymentLabel } from 'app/shared/model/settlement/payment-label.model';
import { IPaymentCategory } from 'app/shared/model/settlement/payment-category.model';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { IPaymentInvoice } from 'app/shared/model/settlement/payment-invoice.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';

export interface ISettlement {
  id?: number;
  paymentNumber?: string | null;
  paymentDate?: string | null;
  paymentAmount?: number | null;
  description?: string | null;
  notes?: string | null;
  calculationFileContentType?: string | null;
  calculationFile?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  placeholders?: IPlaceholder[] | null;
  settlementCurrency?: ISettlementCurrency;
  paymentLabels?: IPaymentLabel[] | null;
  paymentCategory?: IPaymentCategory;
  groupSettlement?: ISettlement | null;
  biller?: IDealer;
  paymentInvoices?: IPaymentInvoice[] | null;
  signatories?: IDealer[] | null;
  businessDocuments?: IBusinessDocument[] | null;
}

export const defaultValue: Readonly<ISettlement> = {};
