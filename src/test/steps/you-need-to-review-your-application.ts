import { Checkbox } from '../../main/app/case/case';
import { ApplicationType, DivorceOrDissolution, Gender, YesOrNo } from '../../main/app/case/definition';

import { iSetTheUsersCaseTo } from './common';

const caseData = {
  applicant1HelpWithFeesRefNo: 'HWF-ABC-123',
  certificateInEnglish: YesOrNo.NO,
  hasCertificate: YesOrNo.YES,
  applicant1AlreadyAppliedForHelpPaying: YesOrNo.YES,
  inTheUk: YesOrNo.NO,
  certifiedTranslation: YesOrNo.YES,
  applicant1HelpPayingNeeded: YesOrNo.YES,
  ceremonyCountry: 'Mozambique',
  'relationshipDate-day': 31,
  'relationshipDate-month': 12,
  'relationshipDate-year': 1999,
  ceremonyPlace: 'Maputo',
};

Given('I am reviewing an application for divorce created by my wife', async () => {
  iSetTheUsersCaseTo({
    ...caseData,
    applicationType: ApplicationType.JOINT_APPLICATION,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    gender: Gender.FEMALE,
    sameSex: Checkbox.Unchecked,
    screenHasUnionBroken: YesOrNo.YES,
  });
});

Given('I am reviewing an application for divorce created by my husband', async () => {
  iSetTheUsersCaseTo({
    ...caseData,
    applicationType: ApplicationType.JOINT_APPLICATION,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    gender: Gender.MALE,
    sameSex: Checkbox.Unchecked,
    screenHasUnionBroken: YesOrNo.YES,
  });
});

Given('I am reviewing an application for dissolution of my civil partnership', async () => {
  iSetTheUsersCaseTo({
    ...caseData,
    applicationType: ApplicationType.JOINT_APPLICATION,
    divorceOrDissolution: DivorceOrDissolution.DISSOLUTION,
    gender: Gender.MALE,
    sameSex: Checkbox.Checked,
    screenHasUnionBroken: YesOrNo.YES,
  });
});
