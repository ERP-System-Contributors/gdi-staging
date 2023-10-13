import dayjs from 'dayjs';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
import { ILeaseContract } from 'app/shared/model/leases/lease-contract.model';
import { ILeaseModelMetadata } from 'app/shared/model/leases/lease-model-metadata.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';

export interface ILeaseLiabilityScheduleItem {
  id?: number;
  sequenceNumber?: number | null;
  periodIncluded?: boolean | null;
  periodStartDate?: string | null;
  periodEndDate?: string | null;
  openingBalance?: number | null;
  cashPayment?: number | null;
  principalPayment?: number | null;
  interestPayment?: number | null;
  outstandingBalance?: number | null;
  interestPayableOpening?: number | null;
  interestExpenseAccrued?: number | null;
  interestPayableBalance?: number | null;
  placeholders?: IPlaceholder[] | null;
  leaseContract?: ILeaseContract;
  leaseModelMetadata?: ILeaseModelMetadata | null;
  universallyUniqueMappings?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<ILeaseLiabilityScheduleItem> = {
  periodIncluded: false,
};
