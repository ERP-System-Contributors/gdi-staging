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

import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IDealer } from 'app/shared/model/people/dealer.model';
import { IBusinessStamp } from 'app/shared/model/settlement/business-stamp.model';
import { IPurchaseOrder } from 'app/shared/model/settlement/purchase-order.model';
import { IBusinessDocument } from 'app/shared/model/documentation/business-document.model';

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
