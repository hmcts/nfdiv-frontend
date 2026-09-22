import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/cy.js';

import { SupportedLanguages } from '../../../modules/i18n/index.js';
import { isDateInputInvalid } from '../../form/validation.js';
import type { CaseDate } from '../case.js';

export const getFormattedCaseDate = (date: CaseDate | undefined, locale = SupportedLanguages.En): string | false =>
  date && !isDateInputInvalid(date) ? getFormattedDate(Object.values(date).join('-'), locale) : false;

export const getFormattedDate = (date: string | Dayjs | undefined, locale = SupportedLanguages.En): string | false =>
  date ? dayjs(date).locale(locale).format('D MMMM YYYY') : false;
