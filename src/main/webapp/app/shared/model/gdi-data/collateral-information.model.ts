import dayjs from 'dayjs';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { ICollateralType } from 'app/shared/model/gdi/collateral-type.model';
import { ICountySubCountyCode } from 'app/shared/model/gdi-data/county-sub-county-code.model';
import { CollateralInsuredFlagTypes } from 'app/shared/model/enumerations/collateral-insured-flag-types.model';

export interface ICollateralInformation {
  id?: number;
  reportingDate?: string;
  collateralId?: string;
  loanContractId?: string;
  customerId?: string;
  registrationPropertyNumber?: string | null;
  collateralOMVInCCY?: number;
  collateralFSVInLCY?: number;
  collateralDiscountedValue?: number | null;
  amountCharged?: number;
  collateralDiscountRate?: number | null;
  loanToValueRatio?: number | null;
  nameOfPropertyValuer?: string | null;
  collateralLastValuationDate?: string | null;
  insuredFlag?: CollateralInsuredFlagTypes;
  nameOfInsurer?: string | null;
  amountInsured?: number | null;
  insuranceExpiryDate?: string | null;
  guaranteeInsurers?: string | null;
  bankCode?: IInstitutionCode;
  branchCode?: IBankBranchCode;
  collateralType?: ICollateralType;
  countyCode?: ICountySubCountyCode | null;
}

export const defaultValue: Readonly<ICollateralInformation> = {};
