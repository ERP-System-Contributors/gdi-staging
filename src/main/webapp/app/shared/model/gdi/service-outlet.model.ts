import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { IBankBranchCode } from 'app/shared/model/gdi/bank-branch-code.model';
import { IOutletType } from 'app/shared/model/gdi/outlet-type.model';
import { IOutletStatus } from 'app/shared/model/gdi/outlet-status.model';
import { ICountyCode } from 'app/shared/model/gdi/county-code.model';

export interface IServiceOutlet {
  id?: number;
  outletCode?: string;
  outletName?: string;
  town?: string | null;
  parliamentaryConstituency?: string | null;
  gpsCoordinates?: string | null;
  outletOpeningDate?: string | null;
  regulatorApprovalDate?: string | null;
  outletClosureDate?: string | null;
  dateLastModified?: string | null;
  licenseFeePayable?: number | null;
  placeholders?: IPlaceholder[] | null;
  bankCode?: IBankBranchCode | null;
  outletType?: IOutletType | null;
  outletStatus?: IOutletStatus | null;
  countyName?: ICountyCode | null;
  subCountyName?: ICountyCode | null;
}

export const defaultValue: Readonly<IServiceOutlet> = {};
