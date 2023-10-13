import dayjs from 'dayjs';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { ICardTypes } from 'app/shared/model/gdi/card-types.model';
import { ICardBrandType } from 'app/shared/model/gdi/card-brand-type.model';
import { ICardCategoryType } from 'app/shared/model/gdi/card-category-type.model';
import { IBankTransactionType } from 'app/shared/model/gdi/bank-transaction-type.model';
import { IChannelType } from 'app/shared/model/gdi/channel-type.model';
import { ICardState } from 'app/shared/model/gdi-data/card-state.model';

export interface ICardUsageInformation {
  id?: number;
  reportingDate?: string;
  totalNumberOfLiveCards?: number;
  totalActiveCards?: number;
  totalNumberOfTransactionsDone?: number;
  totalValueOfTransactionsDoneInLCY?: number;
  bankCode?: IInstitutionCode;
  cardType?: ICardTypes;
  cardBrand?: ICardBrandType;
  cardCategoryType?: ICardCategoryType;
  transactionType?: IBankTransactionType;
  channelType?: IChannelType;
  cardState?: ICardState;
}

export const defaultValue: Readonly<ICardUsageInformation> = {};
