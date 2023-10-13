import dayjs from 'dayjs';
import { ICountySubCountyCode } from 'app/shared/model/gdi-data/county-sub-county-code.model';
import { IInstitutionCode } from 'app/shared/model/gdi/institution-code.model';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { IOutletType } from 'app/shared/model/gdi/outlet-type.model';
import { IOutletStatus } from 'app/shared/model/gdi/outlet-status.model';

export interface IParticularsOfOutlet {
  id?: number;
  businessReportingDate?: string;
  outletName?: string;
  town?: string;
  iso6709Latitute?: number;
  iso6709Longitude?: number;
  cbkApprovalDate?: string;
  outletOpeningDate?: string;
  outletClosureDate?: string | null;
  licenseFeePayable?: number;
  subCountyCode?: ICountySubCountyCode;
  bankCode?: IInstitutionCode;
  outletId?: IBankBranchCode;
  typeOfOutlet?: IOutletType;
  outletStatus?: IOutletStatus;
}

export const defaultValue: Readonly<IParticularsOfOutlet> = {};
