import dayjs from 'dayjs';
import { IDealer } from 'app/shared/model/gdi-data/dealer.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';

export interface IBusinessStamp {
  id?: number;
  stampDate?: string | null;
  purpose?: string | null;
  details?: string | null;
  remarks?: string | null;
  stampHolder?: IDealer;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IBusinessStamp> = {};
