import { IUniversallyUniqueMapping } from 'app/shared/model/gdi/universally-unique-mapping.model';
import { IPlaceholder } from 'app/shared/model/system/placeholder.model';
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
