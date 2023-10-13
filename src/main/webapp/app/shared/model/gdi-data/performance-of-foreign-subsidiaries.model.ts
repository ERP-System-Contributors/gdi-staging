import dayjs from 'dayjs';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IIsoCountryCode } from 'app/shared/model/gdi/iso-country-code.model';

export interface IPerformanceOfForeignSubsidiaries {
  id?: number;
  subsidiaryName?: string;
  reportingDate?: string;
  subsidiaryId?: string;
  grossLoansAmount?: number;
  grossNPALoanAmount?: number;
  grossAssetsAmount?: number;
  grossDepositsAmount?: number;
  profitBeforeTax?: number;
  totalCapitalAdequacyRatio?: number;
  liquidityRatio?: number;
  generalProvisions?: number;
  specificProvisions?: number;
  interestInSuspenseAmount?: number;
  totalNumberOfStaff?: number;
  numberOfBranches?: number;
  bankCode?: IInstitutionCode;
  subsidiaryCountryCode?: IIsoCountryCode;
}

export const defaultValue: Readonly<IPerformanceOfForeignSubsidiaries> = {};
