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

import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IPaymentInvoice } from 'app/shared/model/settlement/payment-invoice.model';
import { IServiceOutlet } from 'app/shared/model/gdi/service-outlet.model';
import { ISettlement } from 'app/shared/model/settlement/settlement.model';
import { IPurchaseOrder } from 'app/shared/model/settlement/purchase-order.model';
import { IDeliveryNote } from 'app/shared/model/settlement/delivery-note.model';
import { IJobSheet } from 'app/shared/model/settlement/job-sheet.model';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { ISettlementCurrency } from 'app/shared/model/gdi/settlement-currency.model';
import { IWorkProjectRegister } from 'app/shared/model/assets/work-project-register.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';
import { IAssetAccessory } from 'app/shared/model/assets/asset-accessory.model';
import { IAssetWarranty } from 'app/shared/model/assets/asset-warranty.model';

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
