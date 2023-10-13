import dayjs from 'dayjs';

export interface ICardFraudInformation {
  id?: number;
  reportingDate?: string;
  totalNumberOfFraudIncidents?: number;
  valueOfFraudIncedentsInLCY?: number;
}

export const defaultValue: Readonly<ICardFraudInformation> = {};
