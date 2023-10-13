import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { ISettlementCurrency } from 'app/shared/model/gdi-data/settlement-currency.model';
import { IPaymentLabel } from 'app/shared/model/gdi-data/payment-label.model';
import { IPaymentCategory } from 'app/shared/model/gdi-data/payment-category.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { IPaymentInvoice } from 'app/shared/model/gdi-data/payment-invoice.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';

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
