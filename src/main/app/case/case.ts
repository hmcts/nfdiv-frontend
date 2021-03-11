import { DivorceOrDissolution, Gender } from '@hmcts/nfdiv-case-definition';

import { AnyObject } from '../controller/PostController';

export const formFieldsToCaseMapping = {
  divorceOrDissolution: 'divorceOrDissolution',
  gender: 'D8InferredRespondentGender',
  screenHasUnionBroken: 'D8ScreenHasMarriageBroken',
  hasCertificate: 'D8ScreenHasMarriageCert',
  helpPayingNeeded: 'D8HelpWithFeesNeedHelp',
  alreadyAppliedForHelpPaying: 'D8HelpWithFeesAppliedForFees',
  helpWithFeesRefNo: 'D8HelpWithFeesReferenceNumber',
  inTheUk: 'D8MarriedInUk',
  certificateInEnglish: 'D8CertificateInEnglish',
  certifiedTranslation: 'D8CertifiedTranslation',
  livingInEnglandWalesSixMonths: 'D8JurisdictionHabituallyResLast6Months',
};

export function formatCase<InputFormat, OutputFormat>(fields: FieldFormats, data: InputFormat): OutputFormat {
  const result = {};

  for (const field of Object.keys(data)) {
    const value = fields[field];

    if (typeof value === 'function') {
      Object.assign(result, value(data));
    } else if (typeof fields[field] === 'string') {
      result[value] = data[field];
    }
  }

  return result as OutputFormat;
}

export type FieldFormats = Record<string, string | ((AnyObject) => AnyObject)>;

export interface Case {
  divorceOrDissolution: DivorceOrDissolution;
  gender?: Gender;
  sameSex?: Checkbox;
  screenHasUnionBroken?: YesOrNo;
  relationshipDate?: CaseDate;
  hasCertificate?: YesOrNo;
  helpPayingNeeded?: YesOrNo;
  alreadyAppliedForHelpPaying?: YesOrNo;
  helpWithFeesRefNo?: string;
  inTheUk?: YesOrNo;
  certificateInEnglish?: YesOrNo;
  certifiedTranslation?: YesOrNo;
  livingInEnglandWalesSixMonths?: YesOrNo;
}

export interface CaseWithId extends Case {
  id: string;
}

export enum YesOrNo {
  Yes = 'YES',
  No = 'NO',
}

export enum Checkbox {
  Checked = 'checked',
  Unchecked = '',
}

export interface CaseDate {
  year: string;
  month: string;
  day: string;
}

export const JURISDICTION = 'DIVORCE';
export const CASE_TYPE = 'NO_FAULT_DIVORCE';
