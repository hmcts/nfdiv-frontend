export const caseToNFDivFields = {
  partnerGender: 'D8InferredRespondentGender',
  screenHasUnionBroken: 'D8ScreenHasMarriageBroken',
};

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
