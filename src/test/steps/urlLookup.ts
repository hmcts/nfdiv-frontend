import * as urls from '../../main/steps/urls';
import type { PageLink } from '../../main/steps/urls';

export const urlLookup: Readonly<Record<string, PageLink>> = { ...urls };
