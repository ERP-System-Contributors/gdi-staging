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

import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { ISettlementCurrency } from 'app/shared/model/gdi-data/settlement-currency.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IBusinessDocument } from 'app/shared/model/gdi-data/business-document.model';

export interface IWorkProjectRegister {
  id?: number;
  catalogueNumber?: string;
  description?: string;
  detailsContentType?: string | null;
  details?: string | null;
  totalProjectCost?: number | null;
  additionalNotesContentType?: string | null;
  additionalNotes?: string | null;
  dealers?: IDealer[];
  settlementCurrency?: ISettlementCurrency | null;
  placeholders?: IPlaceholder[] | null;
  businessDocuments?: IBusinessDocument[] | null;
}

export const defaultValue: Readonly<IWorkProjectRegister> = {};
