import { AnyObject } from '../controller/PostController';

export const formFieldsToCaseMapping = {
  divorceOrDissolution: 'divorceOrDissolution',
  partnerGender: 'D8InferredRespondentGender',
  screenHasUnionBroken: 'D8ScreenHasMarriageBroken',
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
  divorceOrDissolution: DivorceOrCivilPartnership;
  partnerGender?: Gender;
  D8InferredPetitionerGender?: Gender;
  sameSex?: YesOrNo;
  screenHasUnionBroken?: YesOrNo;
  D8ScreenHasMarriageBroken?: YesOrNo;
}

// TODO switch to use the type field and be Marriage or Civil Partnership (CCD Definitions)
export enum DivorceOrCivilPartnership {
  Divorce = 'divorce',
  CivilPartnership = 'dissolution',
}

export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum YesOrNo {
  Yes = 'YES',
  No = 'NO',
}

export interface CaseWithId extends Case {
  id: string;
}

export interface CaseCreationResponse {
  caseId: string;
  error: string;
  status: string;
  allocatedCourt: Record<string, string>;
  data: Case;
}
