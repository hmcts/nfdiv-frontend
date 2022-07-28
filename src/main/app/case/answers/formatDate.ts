import dayjs from 'dayjs';
import 'dayjs/locale/cy';

import { SupportedLanguages } from '../../../modules/i18n';
import { isDateInputInvalid } from '../../form/validation';
import type { CaseDate } from '../case';

export const getFormattedDate = (date: CaseDate | undefined, locale = SupportedLanguages.En): string | false =>
  date && !isDateInputInvalid(date) ? dayjs(Object.values(date).join('-')).locale(locale).format('D MMMM YYYY') : false;
