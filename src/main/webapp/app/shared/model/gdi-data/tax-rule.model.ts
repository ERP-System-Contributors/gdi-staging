import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface ITaxRule {
  id?: number;
  telcoExciseDuty?: number | null;
  valueAddedTax?: number | null;
  withholdingVAT?: number | null;
  withholdingTaxConsultancy?: number | null;
  withholdingTaxRent?: number | null;
  cateringLevy?: number | null;
  serviceCharge?: number | null;
  withholdingTaxImportedService?: number | null;
  fileUploadToken?: string | null;
  compilationToken?: string | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<ITaxRule> = {};
