import { IUniversallyUniqueMapping } from 'app/shared/model/gdi-data/universally-unique-mapping.model';
import { IPlaceholder } from 'app/shared/model/gdi-data/placeholder.model';
import { ControlTypes } from 'app/shared/model/enumerations/control-types.model';

export interface IQuestionBase {
  id?: number;
  context?: string;
  serial?: string;
  questionBaseValue?: string | null;
  questionBaseKey?: string;
  questionBaseLabel?: string;
  required?: boolean | null;
  order?: number;
  controlType?: ControlTypes;
  placeholder?: string | null;
  iterable?: boolean | null;
  parameters?: IUniversallyUniqueMapping[] | null;
  placeholderItems?: IPlaceholder[] | null;
}

export const defaultValue: Readonly<IQuestionBase> = {
  required: false,
  iterable: false,
};
