import { Checkbox } from '../../main/app/case/case.js';
import { ApplicationType, DivorceOrDissolution, Gender, YesOrNo } from '../../main/app/case/definition.js';
import { CHECK_JURISDICTION } from '../../main/steps/urls.js';

import { iSetTheUsersCaseTo } from './common.js';

const { I } = inject();

Given("I've completed all questions correctly to get to the jurisdiction section", async () => {
  await iSetTheUsersCaseTo({
    applicationType: ApplicationType.SOLE_APPLICATION,
    divorceOrDissolution: DivorceOrDissolution.DIVORCE,
    gender: Gender.MALE,
    hasCertificate: YesOrNo.YES,
    applicant1HelpPayingNeeded: YesOrNo.NO,
    inTheUk: YesOrNo.YES,
    relationshipDate: { day: '31', month: '12', year: '1999' },
    sameSex: Checkbox.Unchecked,
    applicant1ScreenHasUnionBroken: YesOrNo.YES,
    applicant1FirstNames: 'Functional',
    applicant1LastNames: 'Tests',
    applicant1LifeBasedInEnglandAndWales: YesOrNo.YES,
    applicant2LifeBasedInEnglandAndWales: YesOrNo.YES,
  });
  I.amOnPage(CHECK_JURISDICTION);
  I.click('Continue');
});
