import { Checkbox } from '../../main/app/case/case';
import { ApplicationType, DivorceOrDissolution, Gender, YesOrNo } from '../../main/app/case/definition';
import { CHECK_JURISDICTION } from '../../main/steps/urls';

import { iSetTheUsersCaseTo } from './commonHelpers/caseInteraction';
import { iClickSubmit, iSelectYesOrNoForField } from './commonHelpers/elementInteraction';
import { iAmOnPage, iClickToNavigate } from './commonHelpers/navigation';

const CHECK_JURISDICTION_LINK_SELECTOR = `a[href="${CHECK_JURISDICTION}"]`;

export const iDenyWeLiveInEnglandOrWales = (): void => {
  iSelectYesOrNoForField(YesOrNo.NO, 'applicant1LifeBasedInEnglandAndWales');
  iSelectYesOrNoForField(YesOrNo.NO, 'applicant2LifeBasedInEnglandAndWales');
};
export const iDenyWeAreDomiciledInEnglandOrWales = (): void => {
  iSelectYesOrNoForField(YesOrNo.NO, 'applicant1DomicileInEnglandWales');
  iSelectYesOrNoForField(YesOrNo.NO, 'applicant2DomicileInEnglandWales');
};

export const iClickCheckJurisdictionLink = async (nextUrl?: string | RegExp, wait?: number): Promise<void> => {
  await iClickToNavigate(CHECK_JURISDICTION_LINK_SELECTOR, wait, nextUrl || CHECK_JURISDICTION);
};

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
  iAmOnPage(CHECK_JURISDICTION);
  await iClickSubmit();
});

Given('neither of us live in England or Wales', iDenyWeLiveInEnglandOrWales);

Given('neither of us are domiciled in England or Wales', iDenyWeAreDomiciledInEnglandOrWales);

When('I click to check how we are connected to England or Wales again', iClickCheckJurisdictionLink);
