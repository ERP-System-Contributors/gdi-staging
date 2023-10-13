import dayjs from 'dayjs';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IIsoCurrencyCode } from 'app/shared/model/gdi/iso-currency-code.model';

export interface IExchangeRate {
  id?: number;
  businessReportingDay?: string;
  buyingRate?: number;
  sellingRate?: number;
  meanRate?: number;
  closingBidRate?: number;
  closingOfferRate?: number;
  usdCrossRate?: number;
  institutionCode?: IInstitutionCode;
  currencyCode?: IIsoCurrencyCode;
}

export const defaultValue: Readonly<IExchangeRate> = {};
