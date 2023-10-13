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
