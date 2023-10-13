import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IPaymentInvoice } from 'app/shared/model/gdi-data/payment-invoice.model';
import { IServiceOutlet } from 'app/shared/model/gdi-data/service-outlet.model';
import { ISettlement } from 'app/shared/model/gdi-data/settlement.model';
import { IAssetCategory } from 'app/shared/model/gdi-data/asset-category.model';
import { IPurchaseOrder } from 'app/shared/model/gdi-data/purchase-order.model';
import { IDeliveryNote } from 'app/shared/model/gdi-data/delivery-note.model';
import { IJobSheet } from 'app/shared/model/gdi-data/job-sheet.model';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { ISettlementCurrency } from 'app/shared/model/gdi-data/settlement-currency.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';
import { IAssetWarranty } from 'app/shared/model/gdi-data/asset-warranty.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';
import { IAssetAccessory } from 'app/shared/model/gdi-data/asset-accessory.model';

export interface IAssetRegistration {
  id?: number;
  assetNumber?: string;
  assetTag?: string;
  assetDetails?: string | null;
  assetCost?: number;
  commentsContentType?: string | null;
  comments?: string | null;
  modelNumber?: string | null;
  serialNumber?: string | null;
  remarks?: string | null;
  capitalizationDate?: string;
  historicalCost?: number | null;
  registrationDate?: string | null;
  placeholders?: IPlaceholder[] | null;
  paymentInvoices?: IPaymentInvoice[] | null;
  serviceOutlets?: IServiceOutlet[] | null;
  settlements?: ISettlement[];
  assetCategory?: IAssetCategory;
  purchaseOrders?: IPurchaseOrder[] | null;
  deliveryNotes?: IDeliveryNote[] | null;
  jobSheets?: IJobSheet[] | null;
  dealer?: IDealer;
  designatedUsers?: IDealer[] | null;
  settlementCurrency?: ISettlementCurrency | null;
  businessDocuments?: IBusinessDocument[] | null;
  assetWarranties?: IAssetWarranty[] | null;
  universallyUniqueMappings?: IUniversallyUniqueMapping[] | null;
  assetAccessories?: IAssetAccessory[] | null;
  mainServiceOutlet?: IServiceOutlet | null;
}

export const defaultValue: Readonly<IAssetRegistration> = {};
