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
import { IPaymentLabel } from 'app/shared/model/gdi-data/payment-label.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IPaymentRequisition {
  id?: number;
  receptionDate?: string | null;
  dealerName?: string | null;
  briefDescription?: string | null;
  requisitionNumber?: string | null;
  invoicedAmount?: number | null;
  disbursementCost?: number | null;
  taxableAmount?: number | null;
  requisitionProcessed?: boolean | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  paymentLabels?: IPaymentLabel[] | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IPaymentRequisition> = {
  requisitionProcessed: false,
};
