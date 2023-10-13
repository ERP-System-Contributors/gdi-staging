import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { IBusinessStamp } from 'app/shared/model/gdi-data/business-stamp.model';
import { IPurchaseOrder } from 'app/shared/model/gdi-data/purchase-order.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';

export interface IDeliveryNote {
  id?: number;
  deliveryNoteNumber?: string;
  documentDate?: string;
  description?: string | null;
  serialNumber?: string | null;
  quantity?: number | null;
  remarks?: string | null;
  placeholders?: IPlaceholder[] | null;
  receivedBy?: IDealer;
  deliveryStamps?: IBusinessStamp[] | null;
  purchaseOrder?: IPurchaseOrder | null;
  supplier?: IDealer;
  signatories?: IDealer[] | null;
  otherPurchaseOrders?: IPurchaseOrder[] | null;
  businessDocuments?: IBusinessDocument[] | null;
}

export const defaultValue: Readonly<IDeliveryNote> = {};
