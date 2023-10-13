import dayjs from 'dayjs';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { ICreditCardOwnership } from 'app/shared/model/gdi/credit-card-ownership.model';
import { IIsoCurrencyCode } from 'app/shared/model/gdi/iso-currency-code.model';

export interface ICreditCardFacility {
  id?: number;
  reportingDate?: string;
  totalNumberOfActiveCreditCards?: number;
  totalCreditCardLimitsInCCY?: number;
  totalCreditCardLimitsInLCY?: number;
  totalCreditCardAmountUtilisedInCCY?: number;
  totalCreditCardAmountUtilisedInLcy?: number;
  totalNPACreditCardAmountInFCY?: number;
  totalNPACreditCardAmountInLCY?: number;
  bankCode?: IInstitutionCode;
  customerCategory?: ICreditCardOwnership;
  currencyCode?: IIsoCurrencyCode;
}

export const defaultValue: Readonly<ICreditCardFacility> = {};
