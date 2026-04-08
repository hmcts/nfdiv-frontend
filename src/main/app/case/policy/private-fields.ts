import { Case } from '../case';
import { CaseData, ContactDetailsType, YesOrNo } from '../definition';

export const applicant1PrivateFieldPolicy = {
  canView: (data: Partial<CaseData>, viewerIsApplicant2: boolean): boolean => {
    const viewerIsApplicant1 = !viewerIsApplicant2;
    const applicant1IsPublic = data.applicant1ContactDetailsType === ContactDetailsType.PUBLIC;

    return viewerIsApplicant1 || applicant1IsPublic;
  },
  canEdit: (_data: Partial<Case>, editorIsApplicant2: boolean): boolean => {
    return !editorIsApplicant2;
  },
};

export const applicant2PrivateFieldPolicy = {
  canView: (data: Partial<CaseData>, viewerIsApplicant2: boolean): boolean => {
    const applicant2IsPublic = data.applicant2ContactDetailsType === ContactDetailsType.PUBLIC;

    return viewerIsApplicant2 || applicant2IsPublic;
  },
  canEdit: (data: Partial<Case>, editorIsApplicant2: boolean): boolean => {
    const applicant2IsPublic = data.applicant2AddressPrivate === YesOrNo.NO;

    return editorIsApplicant2 || applicant2IsPublic;
  },
};
