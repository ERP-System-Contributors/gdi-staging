///
/// GDI Staging - Mark VI No 1 (Phoebe Series) Client 0.0.1-SNAPSHOT
/// Copyright © 2021 - 2023 Edwin Njeru (mailnjeru@gmail.com)
///
/// This program is free software: you can redistribute it and/or modify
/// it under the terms of the GNU General Public License as published by
/// the Free Software Foundation, either version 3 of the License, or
/// (at your option) any later version.
///
/// This program is distributed in the hope that it will be useful,
/// but WITHOUT ANY WARRANTY; without even the implied warranty of
/// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
/// GNU General Public License for more details.
///
/// You should have received a copy of the GNU General Public License
/// along with this program. If not, see <http://www.gnu.org/licenses/>.
///

import { IAssetWarranty } from 'app/shared/model/assets/asset-warranty.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IPaymentInvoice } from 'app/shared/model/settlement/payment-invoice.model';
import { IServiceOutlet } from 'app/shared/model/gdi/service-outlet.model';
import { ISettlement } from 'app/shared/model/settlement/settlement.model';
import { IAssetCategory } from 'app/shared/model/assets/asset-category.model';
import { IPurchaseOrder } from 'app/shared/model/settlement/purchase-order.model';
import { IDeliveryNote } from 'app/shared/model/settlement/delivery-note.model';
import { IJobSheet } from 'app/shared/model/settlement/job-sheet.model';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';

export interface IAssetAccessory {
  id?: number;
  assetTag?: string | null;
  assetDetails?: string | null;
  commentsContentType?: string | null;
  comments?: string | null;
  modelNumber?: string | null;
  serialNumber?: string | null;
  assetWarranties?: IAssetWarranty[] | null;
  placeholders?: IPlaceholder[] | null;
  paymentInvoices?: IPaymentInvoice[] | null;
  serviceOutlet?: IServiceOutlet;
  settlements?: ISettlement[];
  assetCategory?: IAssetCategory;
  purchaseOrders?: IPurchaseOrder[] | null;
  deliveryNotes?: IDeliveryNote[] | null;
  jobSheets?: IJobSheet[] | null;
  dealer?: IDealer;
  designatedUsers?: IDealer[] | null;
  businessDocuments?: IBusinessDocument[] | null;
  universallyUniqueMappings?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<IAssetAccessory> = {};
