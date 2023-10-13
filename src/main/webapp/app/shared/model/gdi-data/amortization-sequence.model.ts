import dayjs from 'dayjs';
import { IPrepaymentAccount } from 'app/shared/model/gdi-data/prepayment-account.model';
import { IAmortizationRecurrence } from 'app/shared/model/gdi-data/amortization-recurrence.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { IPrepaymentMapping } from 'app/shared/model/gdi-data/prepayment-mapping.model';
import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';

export interface IAmortizationSequence {
  id?: number;
  prepaymentAccountGuid?: string;
  recurrenceGuid?: string;
  sequenceNumber?: number;
  particulars?: string | null;
  currentAmortizationDate?: string;
  previousAmortizationDate?: string | null;
  nextAmortizationDate?: string | null;
  isCommencementSequence?: boolean;
  isTerminalSequence?: boolean;
  amortizationAmount?: number;
  sequenceGuid?: string;
  prepaymentAccount?: IPrepaymentAccount;
  amortizationRecurrence?: IAmortizationRecurrence;
  placeholders?: IPlaceholder[] | null;
  prepaymentMappings?: IPrepaymentMapping[] | null;
  applicationParameters?: IUniversallyUniqueMapping[] | null;
}

export const defaultValue: Readonly<IAmortizationSequence> = {
  isCommencementSequence: false,
  isTerminalSequence: false,
};
