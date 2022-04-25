import { Checkbox } from '../../main/app/case/case';
import { ApplicationType, DivorceOrDissolution, Gender, YesOrNo } from '../../main/app/case/definition';
import { setJurisdictionFieldsAsNull } from '../../main/app/jurisdiction/jurisdictionRemovalHelper';
import { CHECK_JURISDICTION } from '../../main/steps/urls';

import { iSetTheUsersCaseTo } from './common';

const { I } = inject();

Given('I reset the jurisdiction connections', async () => {
  const userCaseObj = setJurisdictionFieldsAsNull({});
  await iSetTheUsersCaseTo(userCaseObj);
  I.amOnPage(CHECK_JURISDICTION);
  I.click('Continue');
});

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
