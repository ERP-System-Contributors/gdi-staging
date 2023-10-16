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
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IChannelType } from 'app/shared/model/gdi/channel-type.model';
import { ICardBrandType } from 'app/shared/model/gdi/card-brand-type.model';
import { IIsoCurrencyCode } from 'app/shared/model/gdi/iso-currency-code.model';
import { ICardCategoryType } from 'app/shared/model/gdi/card-category-type.model';

export interface ICardAcquiringTransaction {
  id?: number;
  reportingDate?: string;
  terminalId?: string;
  numberOfTransactions?: number;
  valueOfTransactionsInLCY?: number;
  bankCode?: IInstitutionCode;
  channelType?: IChannelType;
  cardBrandType?: ICardBrandType;
  currencyOfTransaction?: IIsoCurrencyCode;
  cardIssuerCategory?: ICardCategoryType;
}

export const defaultValue: Readonly<ICardAcquiringTransaction> = {};
