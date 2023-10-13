import dayjs from 'dayjs';

export interface IWeeklyCounterfeitHolding {
  id?: number;
  reportingDate?: string;
  dateConfiscated?: string;
  serialNumber?: string;
  depositorsNames?: string;
  tellersNames?: string;
  dateSubmittedToCBK?: string;
  remarks?: string | null;
}

export const defaultValue: Readonly<IWeeklyCounterfeitHolding> = {};
