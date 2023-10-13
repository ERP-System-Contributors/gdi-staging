import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IPaymentInvoice } from 'app/shared/model/gdi-data/payment-invoice.model';
import { IServiceOutlet } from 'app/shared/model/gdi-data/service-outlet.model';
import { ISettlement } from 'app/shared/model/gdi-data/settlement.model';
import { IPurchaseOrder } from 'app/shared/model/gdi-data/purchase-order.model';
import { IDeliveryNote } from 'app/shared/model/gdi-data/delivery-note.model';
import { IJobSheet } from 'app/shared/model/gdi-data/job-sheet.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { ISettlementCurrency } from 'app/shared/model/gdi-data/settlement-currency.model';
import { IWorkProjectRegister } from 'app/shared/model/gdi-data/work-project-register.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';
import { IAssetAccessory } from 'app/shared/model/gdi-data/asset-accessory.model';
import { IAssetWarranty } from 'app/shared/model/gdi-data/asset-warranty.model';

export interface IWorkInProgressRegistration {
  id?: number;
  sequenceNumber?: string;
  particulars?: string | null;
  instalmentAmount?: number | null;
  commentsContentType?: string | null;
  comments?: string | null;
  placeholders?: IPlaceholder[] | null;
  paymentInvoices?: IPaymentInvoice[] | null;
  serviceOutlets?: IServiceOutlet[] | null;
  settlements?: ISettlement[] | null;
  purchaseOrders?: IPurchaseOrder[] | null;
  deliveryNotes?: IDeliveryNote[] | null;
  jobSheets?: IJobSheet[] | null;
  dealer?: IDealer | null;
  workInProgressGroup?: IWorkInProgressRegistration | null;
  settlementCurrency?: ISettlementCurrency | null;
  workProjectRegister?: IWorkProjectRegister | null;
  businessDocuments?: IBusinessDocument[] | null;
  assetAccessories?: IAssetAccessory[] | null;
  assetWarranties?: IAssetWarranty[] | null;
}

export const defaultValue: Readonly<IWorkInProgressRegistration> = {};
