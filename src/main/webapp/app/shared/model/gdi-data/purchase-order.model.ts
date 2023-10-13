import dayjs from 'dayjs';
import { ISettlementCurrency } from 'app/shared/model/gdi-data/settlement-currency.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';

export interface IPurchaseOrder {
  id?: number;
  purchaseOrderNumber?: string;
  purchaseOrderDate?: string | null;
  purchaseOrderAmount?: number | null;
  description?: string | null;
  notes?: string | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  remarks?: string | null;
  settlementCurrency?: ISettlementCurrency | null;
  placeholders?: IPlaceholder[] | null;
  signatories?: IDealer[] | null;
  vendor?: IDealer;
  businessDocuments?: IBusinessDocument[] | null;
}

export const defaultValue: Readonly<IPurchaseOrder> = {};
