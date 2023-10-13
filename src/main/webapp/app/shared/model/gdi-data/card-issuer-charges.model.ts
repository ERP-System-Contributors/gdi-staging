import dayjs from 'dayjs';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { ICardCategoryType } from 'app/shared/model/gdi/card-category-type.model';
import { ICardTypes } from 'app/shared/model/gdi/card-types.model';
import { ICardBrandType } from 'app/shared/model/gdi/card-brand-type.model';
import { ICardClassType } from 'app/shared/model/gdi/card-class-type.model';
import { ICardCharges } from 'app/shared/model/gdi/card-charges.model';

export interface ICardIssuerCharges {
  id?: number;
  reportingDate?: string;
  cardFeeChargeInLCY?: number;
  bankCode?: IInstitutionCode;
  cardCategory?: ICardCategoryType;
  cardType?: ICardTypes;
  cardBrand?: ICardBrandType;
  cardClass?: ICardClassType;
  cardChargeType?: ICardCharges;
}

export const defaultValue: Readonly<ICardIssuerCharges> = {};
