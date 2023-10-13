import { IPlaceholder } from 'app/shared/model/system/placeholder.model';

export interface IMessageToken {
  id?: number;
  description?: string | null;
  timeSent?: number;
  tokenValue?: string;
  received?: boolean | null;
  actioned?: boolean | null;
  contentFullyEnqueued?: boolean | null;
  placeholders?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IMessageToken> = {
  received: false,
  actioned: false,
  contentFullyEnqueued: false,
};
