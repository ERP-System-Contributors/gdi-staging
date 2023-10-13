import { CardStateFlagTypes } from 'app/shared/model/enumerations/card-state-flag-types.model';

export interface ICardState {
  id?: number;
  cardStateFlag?: CardStateFlagTypes;
  cardStateFlagDetails?: string;
  cardStateFlagDescription?: string | null;
}

export const defaultValue: Readonly<ICardState> = {};
